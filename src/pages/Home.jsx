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
            <div className="container-fluid poem-day-container d-flex h-100 ">
                <span className="title d-none d-md-block">Poema del día</span>
                <PoemOfDay poem={poemOfTheDay}></PoemOfDay>
                <a href="#poems-cards" className="jam jam-chevron-down">&nbsp;</a>
            </div>
            <div className="container poems-cards-container">
                <Poems showFull={false}></Poems>
            </div>
        </Fragment>
     );
}
 
export default Home;