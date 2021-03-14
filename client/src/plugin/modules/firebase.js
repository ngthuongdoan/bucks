import { firebase } from "@firebase/app";
require("firebase/auth");
import store from "@/store";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5BKYT7KS2EEnuM4NuDrn0titAHZDeXiY",
  authDomain: "bucks-10010.firebaseapp.com",
  projectId: "bucks-10010",
  storageBucket: "bucks-10010.appspot.com",
  messagingSenderId: "887916796325",
  appId: "1:887916796325:web:ee8e8c69e046004139b04c",
  measurementId: "G-Z5QR8MVVB9",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("userModule/fetchUser", user);
});
