import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAC5qVIHmX8CS5u1mvzhypys4f7n98BGt4",
    authDomain: "vitehire-app.firebaseapp.com",
    projectId: "vitehire-app",
    storageBucket: "vitehire-app.firebasestorage.app",
    messagingSenderId: "803154669211",
    appId: "1:803154669211:web:25ce01734088c5d5f5e03e",
    measurementId: "G-8EDBQEEC0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };

export default app;
