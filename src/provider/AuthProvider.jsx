import React, { useState } from 'react';
import { authMethods } from '../firebase/AuthMethods';
import Firebase from '../firebase/Firebase';

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const initState = { email: '', password: '' }
  const [inputs, setInputs] = useState(initState)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const handleRegister = async () => {
    await authMethods.register(inputs.email, inputs.password, setError, setUser);
  }
  const handleLogin = async () => {
    await authMethods.login(inputs.email, inputs.password, setError, setUser);
  }

  const handleLogout = () => {
    authMethods.logout();
  }

  const isUserValid = () => {
    return authMethods.isUserValid();
  }

  React.useEffect(() => {
    Firebase.auth().onAuthStateChanged(
      async (user) => {
        setUser(user);
        setToken(await user.getIdToken(true));}
    );
  }, [])

  return (
    <firebaseAuth.Provider
      value={{
        user,
        token,
        inputs,
        error,
        setInputs,
        setError,
        setUser,
        handleRegister,
        handleLogin,
        handleLogout,
        isUserValid
      }}>
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;