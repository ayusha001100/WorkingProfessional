// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcLNOqPTQMwjh-MdpDRSg_dIazL4N4bZY",
    authDomain: "workingprofessional-710a9.firebaseapp.com",
    projectId: "workingprofessional-710a9",
    storageBucket: "workingprofessional-710a9.firebasestorage.app",
    messagingSenderId: "511708760163",
    appId: "1:511708760163:web:0eae52da2c5ce55998d056",
    measurementId: "G-VF0V17M4LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
