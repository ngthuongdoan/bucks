import {firebaseConfig} from "@/config/firebase.config";
import firebase from "firebase/app";

firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};