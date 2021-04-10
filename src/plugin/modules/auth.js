import store from "@/store";
import firebase from "firebase/app";
import Vue from "vue";
import {firestorePlugin} from 'vuefire';
import {userStore} from "@/plugin/db";

require("firebase/auth");

export const Auth = firebase.auth();
Auth.onAuthStateChanged(async (currentUser) => {
  if (currentUser) {
    const walletSnapshot = await userStore.doc(currentUser.uid).get();
    const snapshot = await walletSnapshot
    const user = snapshot.data();
    store.dispatch("userModule/fetchUser", {selectedWallet: user.selectedWallet, ...currentUser}).then();

  }
});

Vue.use(firestorePlugin);