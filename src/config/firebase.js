// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaiptpq6hO3vBqp8anFR-B_CJ9B0OPTpY",
  authDomain: "react-http-8bc42.firebaseapp.com",
  databaseURL: "https://react-http-8bc42-default-rtdb.firebaseio.com",
  projectId: "react-http-8bc42",
  storageBucket: "react-http-8bc42.appspot.com",
  messagingSenderId: "1052742853006",
  appId: "1:1052742853006:web:31f2bfd287ad25216184df",
  measurementId: "G-H7M5FWBBYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app); 
export const storage = getStorage(app);