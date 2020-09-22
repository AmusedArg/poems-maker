import React from 'react'

const LoginError = (data) => {
  console.log(data.error);
  let msg = '';
  switch (data.error) {
    case 'auth/invalid-email':
      msg = 'El email ingresado es inválido'
      break;
    case 'auth/weak-password':
      msg = 'La contraseña debe tener al menor 6 caracteres'
      break;
    case 'auth/user-not-found':
      msg = 'Los datos ingresados son incorrectos'
      break;
    default:
      msg = 'Por favor reintenta nuevamente'
      break;
  }
  console.log(msg);
  return ( 
    <div className="form-group mx-auto login-error-msg">
      <div className="alert alert-secondary">{msg}</div>
    </div> 
  );
}
 
export default LoginError;