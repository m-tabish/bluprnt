// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAwgq96mymecs3NYUYrd8oc8Lf5gmsYDog",
    authDomain: "bluprnt-bf5a2.firebaseapp.com",
    projectId: "bluprnt-bf5a2",
    storageBucket: "bluprnt-bf5a2.firebasestorage.app",
    messagingSenderId: "722687423435",
    appId: "1:722687423435:web:75b2a27b68c62f2a5c7c4e",
    measurementId: "G-0F7353MB2P"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
