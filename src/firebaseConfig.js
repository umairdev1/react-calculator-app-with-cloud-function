// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/functions";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "/* YOUR_API_KEY */",
  authDomain: "/* YOUR_AUTH_DOMAIN */",
  projectId: "/* YOUR_PROJECT_ID */",
  storageBucket: "/* YOUR_STORAGE_BUCKET */",
  messagingSenderId: "/* YOUR_MESSAGING_SENDER_ID */",
  appId: "/* YOUR_APP_ID */",
  measurementId: "/* YOUR_MEASUREMENT_ID */",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const functions = getFunctions(app);
export const callFunction = (name) => httpsCallable(functions, name);
