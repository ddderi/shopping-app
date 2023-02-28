import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8cnBOtGoIcUjwiEGw8eF9fo9QQRe6P80",
  authDomain: "shopping-cart-139ad.firebaseapp.com",
  projectId: "shopping-cart-139ad",
  storageBucket: "shopping-cart-139ad.appspot.com",
  messagingSenderId: "225927177199",
  appId: "1:225927177199:web:3873070a1623cbd9510c1a",
  measurementId: "G-RZP110LF0F",
};

//initialize
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
