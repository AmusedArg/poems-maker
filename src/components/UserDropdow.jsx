/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../Firebase';

const UserDropdown = () => {
  const user = useSelector(state => state.user);
  const logout = () => {
    firebase.auth().signOut();
  }
  return (
    user.data?.emailVerified && 
    <Fragment>
      <div className="dropdown">
        <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="user-loggedin mr-2">
            {user.data.photoURL ? <img src={user.data.photoURL} alt="user"/> : <span className="bg-secondary btn">{user.data.email}</span>}
          </span>
        </a>

        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
          <button className="dropdown-item" onClick={logout}>Salir</button>
        </div>
      </div>
    </Fragment>
  );
}

export default UserDropdown;