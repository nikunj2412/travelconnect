import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-auth-83398.firebaseapp.com",
  projectId: "react-auth-83398",
  storageBucket: "react-auth-83398.appspot.com",
  messagingSenderId: "990553801965",
  appId: "1:990553801965:web:15513d2c6588547f6cf8e4"
};

export const app = initializeApp(firebaseConfig);