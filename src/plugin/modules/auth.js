import store from "@/store";
import router from "@/router"
import firebase from "firebase/app";
import Vue from "vue";
import {firestorePlugin} from 'vuefire';
import {userStore} from "@/plugin/db";

require("firebase/auth");

export const Auth = firebase.auth();
Auth.onAuthStateChanged(async (u) => {
  const user = await firebase.getCurrentUser();
  if (user) {
    console.log("%cLogged In", "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold")
    const snapshot = await userStore.doc(user.uid).get();
    const userData = await snapshot.data();
    await store.dispatch("userModule/fetchUser", {selectedWallet: userData.selectedWallet, ...user});
    await router.replace("/dashboard");

  } else {
    console.log("%cNot Logged In", "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold")

  }
});

Vue.use(firestorePlugin);