import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBRPrKkC46xusJRSuOI4QyiFI8y50a4Q8g",
  authDomain: "stepchu-db916.firebaseapp.com",
  projectId: "stepchu-db916",
  storageBucket: "stepchu-db916.appspot.com",
  messagingSenderId: "1092161506914",
  appId: "1:1092161506914:web:ee607b4f2399308000cb3b",
  measurementId: "G-076CFZ2BHR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Received a notification while the app is in the background:', remoteMessage);
  // You can customize how to handle the notification here
});

export { db };
