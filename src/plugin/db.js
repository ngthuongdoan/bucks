import firebase from 'firebase/app';
import 'firebase/firestore';

// Get a Firestore instance

export const db = firebase.firestore();

export const walletStore = db.collection("wallets");
export const userStore = db.collection("users");
// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples

const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
