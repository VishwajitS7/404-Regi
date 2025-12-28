import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔴 PASTE YOUR OWN CONFIG VALUES HERE
const firebaseConfig = {
  apiKey: "",
  authDomain: "club-registration-a5631.firebaseapp.com",
  projectId: "club-registration-a5631",
  storageBucket: "club-registration-a5631.firebasestorage.app",
  messagingSenderId: "346699997684",
  appId: "1:346699997684:web:d78c5c1766b05e751719a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ THIS EXPORT IS REQUIRED
export const db = getFirestore(app);
