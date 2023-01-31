// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBILcCuVxulx-_ZJfK1StU_VFckcnBdoVs",
  authDomain: "challange-60c9b.firebaseapp.com",
  projectId: "challange-60c9b",
  storageBucket: "challange-60c9b.appspot.com",
  messagingSenderId: "521626094321",
  appId: "1:521626094321:web:aed7abe194f72332033750",
  measurementId: "G-H8ND6G64ZM"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db  = firebaseApp.firestore();
const auth = firebase.auth();

export { db,auth };