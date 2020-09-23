/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext } from 'react';
import { firebaseAuth } from '../provider/AuthProvider';

const UserDropdown = () => {
  const {user, isUserValid, handleLogout} = useContext(firebaseAuth);
  
  const logout = () => {
    handleLogout();
  }
  return (
    isUserValid() && 
    <Fragment>
      <div className="dropdown">
        <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="user-loggedin mr-2">
            {user.photoURL ? 
              <img src={user.photoURL} alt="user"/> : 
              <span className="btn bg-secondary user-no-picture"><span className="jam jam-user-circle"></span>{user.email}</span>}
          </span>
        </a>

        <div className="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuLink">
          {/* TODO: <button className="dropdown-item" onClick={verPerfil}>Ver Perfil</button> */}
          <button className="dropdown-item" onClick={logout}>Salir</button>
        </div>
      </div>
    </Fragment>
  );
}

export default UserDropdown;