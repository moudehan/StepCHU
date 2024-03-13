import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAh3P3PeSdT3PilQlGTQHOrs_iuEQ_kXh8",
  authDomain: "stepchu-ee8ee.firebaseapp.com",
  projectId: "stepchu-ee8ee",
  storageBucket: "stepchu-ee8ee.appspot.com",
  messagingSenderId: "799912460741",
  appId: "1:799912460741:web:2e1fa954399cf288898bac",
  measurementId: "G-4EZSK23MKJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
