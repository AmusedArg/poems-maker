import firebase from 'firebase/app';

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCvcebGzyj-c4BLN9Xf_kijnWQsOL36pMs",
  authDomain: "poemasmaker.firebaseapp.com",
  databaseURL: "https://poemasmaker.firebaseio.com",
  projectId: "poemasmaker",
  storageBucket: "poemasmaker.appspot.com",
  messagingSenderId: "494721698437",
  appId: "1:494721698437:web:847880ff082263dfff37ec",
  measurementId: "G-14CXWLPN5S"
};
firebase.initializeApp(config);

export default firebase;