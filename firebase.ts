// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJDFWDlECvEvQiCj2ukimx1ThJ7RZBWmk",
  authDomain: "fortuna-referral.firebaseapp.com",
  projectId: "fortuna-referral",
  storageBucket: "fortuna-referral.firebasestorage.app",
  messagingSenderId: "897736556091",
  appId: "1:897736556091:web:6190a57faf9a8b592fe61e",
  measurementId: "G-967LTES11S"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;