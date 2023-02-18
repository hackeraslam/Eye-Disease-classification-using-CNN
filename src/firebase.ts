// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx_rboVajGAh1jATIWHiaebM1KejxCAXg",
  authDomain: "eye-disease-d8ca0.firebaseapp.com",
  projectId: "eye-disease-d8ca0",
  storageBucket: "eye-disease-d8ca0.appspot.com",
  messagingSenderId: "788667378917",
  appId: "1:788667378917:web:b85ce0c75ff7f7a5ac780c",
  measurementId: "G-3HK091VZXT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
