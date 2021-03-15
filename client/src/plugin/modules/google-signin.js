import { firebase } from "@firebase/app";
require("firebase/auth");

let provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
