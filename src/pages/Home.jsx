import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPoemOfTheDayAction } from '../redux/poemDucks';
import Poems from '../components/Poems';
import PoemOfDay from '../components/PoemOfDay';
import Footer from './Footer';

const Home = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    const obtenerPoemOfTheDay = () => {
      dispatch(getPoemOfTheDayAction())
    }
    obtenerPoemOfTheDay()
  }, [dispatch]);

  let poemOfTheDay = useSelector(store => store.poem.poemOfTheDay);

  if (poemOfTheDay) {
    poemOfTheDay.text = poemOfTheDay.text.replace(/\n/g, "<br />");
  }
  return (
    <Fragment>
      <div className="container-fluid poem-day-container d-flex h-100 mb-5">
        <img src="/floral-design.svg" alt="" className="floral-design d-none d-lg-block" id="floral-design-top-right"/>
        <img src="/floral-design-2.svg" alt="" className="floral-design d-none d-lg-block" id="floral-design-bottom-left"/>
        <span className="title d-none d-md-block">Poema del día</span>
        <PoemOfDay poem={poemOfTheDay}></PoemOfDay>
        <a href="#poems-cards" className="jam jam-chevron-down d-none d-lg-block">&nbsp;</a>
      </div>
      <div className="container poems-cards-container">
        <Poems showFull={false}></Poems>
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default Home;