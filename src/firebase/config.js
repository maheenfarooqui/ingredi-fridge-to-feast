// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfgEtbduINu7CTIYtgiKJ2dlTK-R-niLE",
  authDomain: "ingredi-4614f.firebaseapp.com",
  projectId: "ingredi-4614f",
  storageBucket: "ingredi-4614f.firebasestorage.app",
  messagingSenderId: "584122854256",
  appId: "1:584122854256:web:612b109dbefb9928b9bdb5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);