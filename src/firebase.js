// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, signOut, getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs7Uz33C3IRpHnKkGjNdDFTF5lb0YoQjc",
  authDomain: "movemend-f3663.firebaseapp.com",
  projectId: "movemend-f3663",
  storageBucket: "movemend-f3663.appspot.com",
  messagingSenderId: "148922908933",
  appId: "1:148922908933:web:4ee727cfaba61ea545776c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth(app)

function login() {
  return signInWithPopup(auth, provider)
}

function logout() {
  return signOut(auth)
}

export { login, logout, auth };