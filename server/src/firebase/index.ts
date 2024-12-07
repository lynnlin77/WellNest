import { initializeApp, type FirebaseOptions } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyB8IZDfUT3LG9WawkQTHEkNd-WryU3B9d8",
  authDomain: "wellnest-66868.firebaseapp.com",
  projectId: "wellnest-66868",
  storageBucket: "wellnest-66868.firebasestorage.app",
  messagingSenderId: "760502982329",
  appId: "1:760502982329:web:4bf5d6de3ea99c3cb7ed68",
};


export const firebase = initializeApp(firebaseConfig);
export const firestore = getFirestore();

