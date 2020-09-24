import React, { Fragment, useContext, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LoginErrorsParser from '../../components/security/LoginErrorsParser';
import firebase from '../../firebase/Firebase';
import { firebaseAuth } from '../../provider/AuthProvider';

const SignUpPage = () => {
  const [requestPending, setRequestPending] = useState(false);
  const {handleRegister, handleLogin, setInputs, setError, setUser, error, inputs, user} = useContext(firebaseAuth);

  const updateEmail = (e) => {
    const email = e.target.value;
    setInputs(prev => ({...prev, email: email}))
  }

  const updatePassword = (e) => {
    const password = e.target.value;
    setInputs(prev => ({...prev, password: password}))
  }

  const register = async (e) => {
    e.preventDefault();
    setRequestPending(true);
    await handleRegister(inputs.email, inputs.password, setError, setUser);
    setRequestPending(false);
  }

  const login = async (e) => {
    e.preventDefault();
    setRequestPending(true);
    await handleLogin(inputs.email, inputs.password, setError, setUser);
    setRequestPending(false);
  }

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInSuccessUrl: '/',
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.googleProviderId,
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
                <button className="btn btn-secondary btn-lg col-lg-6 col-sm-12" type="button" onClick={register} disabled={!inputs.email || !inputs.password}>Registrarme</button>
                <button className="btn btn-primary btn-lg col-lg-6 col-sm-12" type="button" onClick={login} disabled={!inputs.email || !inputs.password}>Iniciar sesión</button>
              </Fragment>
          }
          </div>
          { error &&
            <div className="col-md-5 form-group mx-auto login-error-msg">
              <LoginErrorsParser error={error} />
            </div>
          }
          {
            (user && !user.emailVerified) && 
            <div className="col-md-5 form-group mx-auto login-error-msg">
              <div className="alert alert-success">{`Verifica tu email ${user.email} para poder iniciar sesión`}</div>
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