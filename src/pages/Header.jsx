import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
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
              <NavLink to="/random" className="nav-link" activeClassName="active">Aleatorio</NavLink>
            </li>
            <li className="nav-item">
              <a href="https://twitter.com/PoemasMaker" className="nav-link link-follow-twitter" activeClassName="active" target="_blank" rel="noopener noreferrer"><span className="jam jam-twitter"></span><span className="d-md-none">@PoemasMaker</span></a>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;