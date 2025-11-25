import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);