/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Fragment } from 'react'
import AuthorsList from '../../components/authors/AuthorsList'
import Sections from './Sections'

const Footer = () => {
  return (
    <Fragment>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>Acerca de mí</h6>
              <p className="text-justify"><b>poemasmaker.web.app</b> es una iniciativa de un proyecto hecho con React para disfrutar de distintos poemas.</p>
              <p>La intención es recopilar fragmentos de poemas que se encuentran disponibles en la web y permitir mayor difusión de los mismos, como así también de sus autores.</p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Secciones</h6>
              <ul className="footer-links">
                <Sections />
                <li><a href="https://twitter.com/PoemasMaker" target="_blank" rel="noopener noreferrer">Twitter Bot</a></li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Autores de los poemas</h6>
              <div className="footer-links">
                <AuthorsList />
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by
                <a href="/"> Poemas Maker</a>.
              </p>
              <br />
              <p className="logos-container">
                <img src="react-logo.png" height="64px" alt="React" className="react-logo" /> <img src="firebase-logo.png" height="64px" alt="firebase" className="firebase-logo"/>
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li><a className="instagram jam jam-instagram" href="https://www.instagram.com/edupereyra91" target="_blank" rel="noopener noreferrer"></a></li>
                <li><a className="twitter jam jam-twitter-circle" href="https://twitter.com/Muse_Syndrome" target="_blank" rel="noopener noreferrer"></a></li>
                <li><a className="linkedin jam jam-linkedin-circle" href="https://www.linkedin.com/in/eduardo-pereyra-504423a4/" target="_blank" rel="noopener noreferrer"></a></li>
                <li><a className="github jam jam-github-circle" href="https://github.com/AmusedArg" target="_blank" rel="noopener noreferrer"></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}

export default Footer;