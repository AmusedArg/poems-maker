/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPoemOfTheDayAction } from '../redux/poemDucks';
import Poems from '../components/Poems';
import PoemOfDay from '../components/PoemOfDay';

const Home = () => {

    const dispatch = useDispatch();
  
    React.useEffect(() => {
        const obtenerPoemOfTheDay = () => {
            dispatch(getPoemOfTheDayAction())
        }
        obtenerPoemOfTheDay()
    }, [dispatch]);

    let poemOfTheDay = useSelector(store => store.poem.poemOfTheDay );
    
    if (poemOfTheDay) {
        poemOfTheDay.text = poemOfTheDay.text.replace(/\n/g, "<br />");
    }
    return ( 
        <Fragment>
            <div className="container-fluid poem-day-container d-flex h-100 mb-5">
                <span className="title d-none d-md-block">Poema del día</span>
                <PoemOfDay poem={poemOfTheDay}></PoemOfDay>
                <a href="#poems-cards" className="jam jam-chevron-down d-none d-lg-block">&nbsp;</a>
            </div>
            <div className="container poems-cards-container">
                <Poems showFull={false}></Poems>
            </div>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>Acerca de mí</h6>
                            <p className="text-justify"><b>poemasmaker.web.app</b> es una iniciativa de un proyecto hecho con React para disfrutar de distintos poemas.</p>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Secciones</h6>
                            <ul className="footer-links">
                                <li><a href="/">Inicio</a></li>
                                <li><a href="/poems">Poemas</a></li>
                                <li><a href="/random">Poema Aleatorio</a></li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Autores de los poemas</h6>
                            <ul className="footer-links">
                                <li><span>Elvira Sastre</span></li>
                                <li><span>Magalí Tajes</span></li>
                                <li><span>Mario Benedetti</span></li>
                                <li><span>Lorena Pronsky</span></li>
                            </ul>
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by 
                                <a href="/"> Poems Maker</a>.
                            </p>
                            <br/>
                            <p>
                                <img src="react-logo.png" height="64px" alt="React"/> <img src="firebase-logo.png" height="64px" alt="firebase"/>
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
 
export default Home;