import React, { Fragment } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../Firebase';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authorizeUserAction } from '../redux/authorizerDucks';

const SignUpPage = () => {
  const dispatch = useDispatch();
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  firebase.auth().onAuthStateChanged(
    (user) => dispatch(authorizeUserAction(user))
  );

  return (
    <Fragment>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Fragment>
  );
}

export default SignUpPage;