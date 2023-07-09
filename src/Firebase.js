import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID ,
    apiKey: "AIzaSyDS6nJ8kDBzhIe9xdu5O-rjvvywNCGWYs8",
    authDomain: "publicmart-9b4bf.firebaseapp.com",
    projectId: "publicmart-9b4bf",
    storageBucket: "publicmart-9b4bf.appspot.com",
    messagingSenderId: "36041401002",
    appId: "1:36041401002:web:555a2ea84ca1a2c1afe6d3"
};

const app = initializeApp(firebaseConfig);

export default app;