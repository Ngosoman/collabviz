// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2UdJxp2JqF1FbM4bF7Z_q9FoC5uf5EWA",
  authDomain: "collabviz-e81be.firebaseapp.com",
  databaseURL: "https://collabviz-e81be-default-rtdb.firebaseio.com",
  projectId: "collabviz-e81be",
  storageBucket: "collabviz-e81be.firebasestorage.app",
  messagingSenderId: "602160884307",
  appId: "1:602160884307:web:470efd6ee3398978a334a6",
  measurementId: "G-17WHP134F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
export const auth = getAuth(app);