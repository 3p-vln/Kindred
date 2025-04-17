import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB4BZKjA3KZJ578scdspkv4tiLM0MmT91k",
    authDomain: "kindred-4b120.firebaseapp.com",
    projectId: "kindred-4b120",
    storageBucket: "kindred-4b120.firebasestorage.app",
    messagingSenderId: "349745742427",
    appId: "1:349745742427:web:612e158012eab63c16757e",
    measurementId: "G-JFRFKGMNGW"
};

const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, 'Secondary');
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export default app;
export { auth, db, storage, secondaryApp };