import firebase from "firebase/app";
import router from "@/router";
// import {Auth} from "@/plugin/modules/auth";

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

// const getCredential = async () =>{
//   const result = await Auth.getRedirectResult();
//   if (result.credential) {
//     let token = result.credential.accessToken;
//     console.log(token);
//   }
// }

export const logout = async () => {
  await firebase.auth().signOut();
  await router.push("/login");
};

export const signInWithPopup = async (provider) => {
  return await firebase.auth().signInWithPopup(provider);
};
