// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf7owmRzv4cEjXLRgFn7SJ4we1eESFZzQ",
  authDomain: "assignmentone-c8e25.firebaseapp.com",
  projectId: "assignmentone-c8e25",
  storageBucket: "assignmentone-c8e25.appspot.com",
  messagingSenderId: "494649535792",
  appId: "1:494649535792:web:1ff5dd2e8123f48faeacf5",
  measurementId: "G-YY6ZR2QG05"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);