import firebase from "firebase/app";
import store from "@/store";
import Vue from "vue";
import {firestorePlugin} from 'vuefire'

require("firebase/auth");

export const Auth = firebase.auth();
Auth.onAuthStateChanged((user) => {
  store.dispatch("userModule/fetchUser", user).then();
});

Vue.use(firestorePlugin);