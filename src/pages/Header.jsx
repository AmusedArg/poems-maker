import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../Firebase';

const Header = () => {
  const user = useSelector(state => state.user)
  const logout = () => {
    firebase.auth().signOut();
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand" href="/">Poemas Maker</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeClassName="active">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/poems" className="nav-link" activeClassName="active">Poemas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/authors" className="nav-link" activeClassName="active">Autores</NavLink>
            </li>
            <li className="nav-item">
              <a href="/random" className="nav-link" >Aleatorio</a>
            </li>
            <li className="nav-item">
              <a href="https://twitter.com/PoemasMaker" className="nav-link link-follow-twitter" target="_blank" rel="noopener noreferrer">
                <span className="jam jam-twitter"></span>
                <span className="tw-username">@PoemasMaker</span>
              </a>
            </li>
          </ul>
          { !user.data ?
            <Fragment>
              <a href="/signup" className="btn btn-outline-secondary bg-white ml-2">Iniciar sesión</a>
            </Fragment>
            :
            <Fragment>
              <span className="user-loggedin mr-2">{user.data.displayName}</span>
              <button className="btn btn-outline-secondary bg-white" onClick={logout}>Salir</button>
            </Fragment>
          }
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;