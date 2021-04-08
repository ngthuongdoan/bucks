import firebase from 'firebase/app';
import 'firebase/firestore';

// Get a Firestore instance

export const db = firebase.firestore();

export const walletStore = db.collection("wallets");
export const categoryStore = db.collection("categories");
export const userStore = db.collection("users");
export const transactionStore = db.collection("transactions");

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples

const {Timestamp, GeoPoint, FieldPath} = firebase.firestore;
export {Timestamp, GeoPoint, FieldPath};
