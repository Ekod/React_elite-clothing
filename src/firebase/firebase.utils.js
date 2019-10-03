import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDSguGcUGrs0vbIg9xopzjNzUCT9q6geE8",
  authDomain: "elite-db-c8707.firebaseapp.com",
  databaseURL: "https://elite-db-c8707.firebaseio.com",
  projectId: "elite-db-c8707",
  storageBucket: "elite-db-c8707.appspot.com",
  messagingSenderId: "279489453489",
  appId: "1:279489453489:web:6ce64ab398cf23d0187190"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
