import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEe_vp6UWjPyVOyTEF9WHu_reH6Sn3ypc",
  authDomain: "diplomka-d2b48.firebaseapp.com",
  projectId: "diplomka-d2b48",
  storageBucket: "diplomka-d2b48.firebasestorage.app",
  messagingSenderId: "37264671310",
  appId: "1:37264671310:web:b72943270b1ef35967b91f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);