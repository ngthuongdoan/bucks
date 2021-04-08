import store from "@/store";
import firebase from "firebase/app";
import Vue from "vue";
import {firestorePlugin} from 'vuefire';
import {userStore} from "@/plugin/db";

require("firebase/auth");

export const Auth = firebase.auth();
Auth.onAuthStateChanged((currentUser) => {
	const walletSnapshot = userStore.doc(currentUser.uid).get();
	walletSnapshot.then(snapshot => {
		const user = snapshot.data();
		store.dispatch("userModule/fetchUser", {selectedWallet: user.selectedWallet, ...currentUser}).then();
	});

});

Vue.use(firestorePlugin);