// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-76ea1.firebaseapp.com",
  projectId: "mern-blog-app-76ea1",
  storageBucket: "mern-blog-app-76ea1.appspot.com",
  messagingSenderId: "195769596079",
  appId: "1:195769596079:web:73b2f38eff6917b63dbc5a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
