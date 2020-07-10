import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA9XMV6Tus0o4J2ildg3QDZO3X93TS3uc0",
    authDomain: "citrus-clothing.firebaseapp.com",
    databaseURL: "https://citrus-clothing.firebaseio.com",
    projectId: "citrus-clothing",
    storageBucket: "citrus-clothing.appspot.com",
    messagingSenderId: "196093475987",
    appId: "1:196093475987:web:c9d0a5635e76cdba71e166",
    measurementId: "G-FK947ZSQCD"
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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;