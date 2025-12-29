// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7FH-PNq2-E20yFFqdBwkztZeokyJNHP4",
  authDomain: "medical-digilocker.firebaseapp.com",
  projectId: "medical-digilocker",
  storageBucket: "medical-digilocker.appspot.com",
  messagingSenderId: "913088962500",
  appId: "1:913088962500:web:b18e1ba0f22f216150ce91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 EXPORT services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
