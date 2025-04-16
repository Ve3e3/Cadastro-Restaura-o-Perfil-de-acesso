import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { doc, updateDoc, getDoc, getFirestore } from 'firebase/firestore'; // Removido getFirestore, setDoc (não utilizados)
import { auth } from './Firebase';

const PerfilScreen = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const db = getFirestore(); // Adicionado para garantir que o Firestore esteja acessível

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData(data);
                    setName(data.name || '');
                    setBio(data.bio || '');
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                await updateDoc(docRef, { name, bio });
                setUserData({ name, bio });
                setIsEditing(false);
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar os dados. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : userData ? (
                <>
                    <Text style={styles.title}>Perfil de Usuario</Text>

                    {isEditing ? (
                        <>
                            <View style={styles.editContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    value={name}
                                    onChangeText={setName}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Bio"
                                    value={bio}
                                    onChangeText={setBio}
                                />
                                <Button title="Salvar" onPress={handleSave} /> {/* Corrigido: Substituído 'button' por 'Button' */}
                                <Button title="Cancelar" onPress={() => setIsEditing(false)} color="#888" /> {/* Corrigido: Substituído 'button' por 'Button' */}
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={styles.text}>Nome: {userData.name}</Text>
                            <Text style={styles.text}>Bio: {userData.bio}</Text>
                            <Button title="Editar" onPress={() => setIsEditing(true)} />
                        </>
                    )}
                </>
            ) : (
                <Text style={styles.text}>Nenhum dado encontrado.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    editContainer: {
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default PerfilScreen;