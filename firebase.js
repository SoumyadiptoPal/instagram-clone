// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyDid9R8n1tTuR4tFKcsE_0R3jIOsxoj8WU",
  authDomain: "rn-igclone-759a8.firebaseapp.com",
  projectId: "rn-igclone-759a8",
  storageBucket: "rn-igclone-759a8.appspot.com",
  messagingSenderId: "105694884148",
  appId: "1:105694884148:web:a16e2c06956c8fd4a2b561",
  measurementId: "G-Z680CBVWS7"
};

// Initialize Firebase
const firebase=initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export {firebase, db}