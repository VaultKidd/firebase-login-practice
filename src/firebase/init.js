// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from  "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxn7zojp0qWUAZJ1TB3q3FJtFVdaEjrAw",
  authDomain: "fir-practice-83066.firebaseapp.com",
  projectId: "fir-practice-83066",
  storageBucket: "fir-practice-83066.appspot.com",
  messagingSenderId: "510765149958",
  appId: "1:510765149958:web:4765227fdb616cbbcdb887"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();