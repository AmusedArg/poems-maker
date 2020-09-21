import 'firebase/auth';
import React, { Fragment, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../Firebase';

const SignUpPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const register = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(data => {
      if(data.user && data.user.emailVerified === false){
        data.user.sendEmailVerification().then(function(){
          setError(null);
          console.log("email verification sent to user");
        }).catch(e => {
          console.log(e);
        });
      }
    }).catch(function (error) {
      setError(error.message);
    });
  }

  const login = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then(data => {
      if(data.user && data.user.emailVerified === false){
        setError('El email no se encuentra verificado.');
      } else {
        setError(null);
      }
    }).catch(function (error) {
      setError(error.message);
    });
  }

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInSuccessUrl: '/',
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: 'Inicia sesión con Google'
      }
    ]
  };

  return (
    <Fragment>
      <div className="container login-page h-100 my-5">
        <div>
          <div className="form-group col-lg-5 mt-5 mx-auto">
            <input type="email" required className="form-control form-control-lg" id="email" aria-describedby="emailHelp" placeholder="Email" onChange={updateEmail} autoComplete="off" autoFocus={true}/>
          </div>
          <div className="form-group col-lg-5 mx-auto">
            <input type="password" required className="form-control form-control-lg" id="password" placeholder="Contraseña" onChange={updatePassword} />
          </div>
          <div className="col-md-5 form-group mx-auto text-center">
            <button className="btn btn-secondary btn-lg w-50" type="button" onClick={register}>Registrarse</button>
            <button className="btn btn-primary btn-lg w-50" type="button" onClick={login}>Iniciar sesión</button>
          </div>
          <div className="col-md-5 form-group mx-auto login-error-msg">
            <small>{error}</small>
          </div>
        </div>
        <div className="text-center">
          <span>O</span>
        </div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </Fragment>
  );
}

export default SignUpPage;