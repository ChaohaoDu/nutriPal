// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsUcoWjaBuveIQNTJWZLAn9xfrElUBBTc",
  authDomain: "nutripal-4b63d.firebaseapp.com",
  projectId: "nutripal-4b63d",
  storageBucket: "nutripal-4b63d.appspot.com",
  messagingSenderId: "50705491705",
  appId: "1:50705491705:web:188d77a693679053eea428",
  measurementId: "G-8L8LF8QN87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
