import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbMgRo9hKEyArJJD0ioxAJtarGhGLIHFE",
  authDomain: "garden-shop-6f80d.firebaseapp.com",
  projectId: "garden-shop-6f80d",
  storageBucket: "garden-shop-6f80d.appspot.com",
  messagingSenderId: "713447322966",
  appId: "1:713447322966:web:6e62d034de3a8cf6be12f7",
  measurementId: "G-GLE3ZY540W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
