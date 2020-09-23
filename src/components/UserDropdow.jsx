/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

const UserDropdown = () => {
  const {user, handleLogout} = useContext(firebaseAuth);
  
  const logout = () => {
    handleLogout();
  }
  return (
    <Fragment>
      <div className="dropdown">
        <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="user-loggedin mr-2">
            {user.photoURL ? 
              <img src={user.photoURL} alt="user"/> : 
              <span className="btn bg-secondary user-no-picture"><span className="jam jam-user-circle"></span>{user.email}</span>}
          </span>
        </a>

        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
          <NavLink to="/profile" className="dropdown-item">Ver Perfil</NavLink>
          <button className="dropdown-item" onClick={logout}>Salir</button>
        </div>
      </div>
    </Fragment>
  );
}

export default UserDropdown;