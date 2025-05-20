// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk4PQMg0xmpXpsR0Exjq0ziApi3-pzLfM",
  authDomain: "mango-f8850.firebaseapp.com",
  projectId: "mango-f8850",
  storageBucket: "mango-f8850.firebasestorage.app",
  messagingSenderId: "326052239406",
  appId: "1:326052239406:web:72d60bff4b3ec823d8a7bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
