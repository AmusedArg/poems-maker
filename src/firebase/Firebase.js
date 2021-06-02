import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_BASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
firebase.initializeApp(config);
const analytics = firebase.analytics();

export const log = (key, value) => {
  analytics.logEvent(key, value);
}

const FirebaseConfig = {
  config,
  auth: firebase.auth,
  googleProviderId: firebase.auth.GoogleAuthProvider.PROVIDER_ID
};

export default FirebaseConfig;