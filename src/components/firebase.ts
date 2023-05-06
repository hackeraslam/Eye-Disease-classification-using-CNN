// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBx_rboVajGAh1jATIWHiaebM1KejxCAXg",
  authDomain: "eye-disease-d8ca0.firebaseapp.com",
  projectId: "eye-disease-d8ca0",
  storageBucket: "eye-disease-d8ca0.appspot.com",
  messagingSenderId: "788667378917",
  appId: "1:788667378917:web:b85ce0c75ff7f7a5ac780c",
  measurementId: "G-3HK091VZXT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;
