import firebase from "firebase/app";
import router from "@/router";

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
  await firebase.auth().signOut();
  await router.push("/login");
};

export const signInWithPopup = async (provider) => {
  const user = await firebase.auth().signInWithPopup(provider);
  // db.collection("users").add()
};
