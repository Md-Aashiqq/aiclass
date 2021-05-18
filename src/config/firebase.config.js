import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpbx5VPTiC9zEWk3oEJHZOvNtwDZMrSvI",
  authDomain: "aiclass-49c69.firebaseapp.com",
  projectId: "aiclass-49c69",
  storageBucket: "aiclass-49c69.appspot.com",
  messagingSenderId: "867619649536",
  appId: "1:867619649536:web:714d88dca7eacf1f8440e5",
  measurementId: "G-WLKDBE8N78",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
