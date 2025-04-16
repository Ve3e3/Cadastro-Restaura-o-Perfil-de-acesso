import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {

  apiKey: "AIzaSyAqaOnNrTGiXbqmECJiCVBCDjO5yun433Q",

  authDomain: "appacessos-defff.firebaseapp.com",

  projectId: "appacessos-defff",

  storageBucket: "appacessos-defff.firebasestorage.app",

  messagingSenderId: "495289919715",

  appId: "1:495289919715:web:12a5e4b2271a8f51ca7dd6",

  measurementId: "G-FR38682RHR"

};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };