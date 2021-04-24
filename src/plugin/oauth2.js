import router from "@/router";
import firebase from "firebase/app";
import {Auth} from "@/plugin/modules/auth";

require("firebase/auth");

export const createProvider = (platform) => {
	let provider;
	switch (platform) {
		case "google":
			provider = new firebase.auth.GoogleAuthProvider();
			break;
		case "facebook":
			provider = new firebase.auth.FacebookAuthProvider();
			break;
		case "github":
			provider = new firebase.auth.GithubAuthProvider();
			break;
	}

	return provider;
};

export const logout = async () => {
	await Auth.signOut();
	await router.push("/login");
};

export const signInWithPopup = async (provider) => {
	return await Auth.signInWithPopup(provider);
};
