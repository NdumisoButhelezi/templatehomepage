// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNcZjNyG0l4f3I8oCVKCm34Bih17S5rBI",
  authDomain: "templatehomepage-533b2.firebaseapp.com",
  projectId: "templatehomepage-533b2",
  storageBucket: "templatehomepage-533b2.firebasestorage.app",
  messagingSenderId: "817852682871",
  appId: "1:817852682871:web:3274dc96df566db88d6c72",
  measurementId: "G-ZHM3ECTE25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };