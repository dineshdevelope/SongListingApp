// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB-9z1zop-wx-cIVi6sEQsJUyX5JrG6hs",
  authDomain: "my-web-app-3fe33.firebaseapp.com",
  projectId: "my-web-app-3fe33",
  storageBucket: "my-web-app-3fe33.appspot.com",
  messagingSenderId: "675687657120",
  appId: "1:675687657120:web:cd9ea864741d74f39e63c5",
  measurementId: "G-TX3DPVHRF1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//console.log(import.meta.env);
//console.log(app);
