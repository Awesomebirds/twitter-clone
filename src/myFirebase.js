import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//configuration from env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIAN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebaseui 인증(로그인)
export const authService = firebase.auth();
// 구글
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const firestoreService = firebase.firestore();
