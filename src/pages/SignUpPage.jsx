import 'firebase/auth';
import React, { Fragment, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LoginError from '../components/LoginError';
import firebase from '../Firebase';

const SignUpPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [requestPending, setRequestPending] = useState(false);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const register = (e) => {
    e.preventDefault();
    setRequestPending(true);
    firebase.auth().createUserWithEmailAndPassword(email, password).then(data => {
      if(data.user && data.user.emailVerified === false){
        data.user.sendEmailVerification().then(function(){
          setMsg(`Verifica tu email ${email} para poder iniciar sesión`)
          setError(null);
          Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
        }).catch(e => {
          setError(e);
          setMsg(null)
        }).finally(()=> setRequestPending(false));
      }
    }).catch(function (error) {
      setMsg(null)
      setError(error.code);
    }).finally(()=> setRequestPending(false));
  }

  const login = (e) => {
    e.preventDefault();
    setRequestPending(true);
    firebase.auth().signInWithEmailAndPassword(email, password).then(data => {
      if(data.user && data.user.emailVerified === false){
        setError('El email no se encuentra verificado.');
      } else {
        setError(null);
      }
    }).catch(function (error) {
      console.log(error);
      setError(error.code);
    }).finally(()=> setRequestPending(false));
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
        <div className="text-center"><h3>Unirme a Poemas Maker</h3></div>
        <div>
          <div className="form-group col-lg-5 mt-5 mx-auto">
            <input type="email" required className="form-control form-control-lg" id="email" aria-describedby="emailHelp" placeholder="Email" onChange={updateEmail} autoComplete="off" autoFocus={true}/>
          </div>
          <div className="form-group col-lg-5 mx-auto">
            <input type="password" required className="form-control form-control-lg" id="password" placeholder="Contraseña" onChange={updatePassword} />
          </div>
          <div className="form-group col-lg-5 mx-auto text-center">
          { requestPending ?
            <div className="progress mb-3">
              <div className="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar"></div>
            </div>
            : <Fragment>
                <button className="btn btn-secondary btn-lg col-lg-6 col-sm-12" type="button" onClick={register} disabled={!email || !password}>Registrarme</button>
                <button className="btn btn-primary btn-lg col-lg-6 col-sm-12" type="button" onClick={login} disabled={!email || !password}>Iniciar sesión</button>
              </Fragment>
          }
          </div>
          { error &&
            <div className="col-md-5 form-group mx-auto login-error-msg">
              <LoginError error={error} />
            </div>
          }
          {
            msg && 
            <div className="col-md-5 form-group mx-auto login-error-msg">
              <div className="alert alert-success">{msg}</div>
            </div>
          }
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