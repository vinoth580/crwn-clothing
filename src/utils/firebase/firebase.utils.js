import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcGehVuu5F6yVH3CC-KDXXE5Bh_KIN4N8",
  authDomain: "clickncart-db.firebaseapp.com",
  projectId: "clickncart-db",
  storageBucket: "clickncart-db.appspot.com",
  messagingSenderId: "404946328823",
  appId: "1:404946328823:web:d25d6929154e5cf3b707f2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); // class

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
) => {
  if(!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  //console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  //console.log(userSnapshot);
  //console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error craeting the user", error.message);
    }
  }
  
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword=async(email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);
};
