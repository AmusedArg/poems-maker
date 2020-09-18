import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Poem from '../components/Poem';
import { getPoemsByAuthorAction } from '../redux/poemsDucks';
import GoTopButton from '../components/GoTopButton';
import Author from '../components/Author';

const PoemAuthorPage = () => {

    let { name } = useParams();

    const dispatch = useDispatch();
  
    React.useEffect(() => {
        const obtenerPoem = () => {
            dispatch(getPoemsByAuthorAction(name))
        }
        obtenerPoem()
    }, [dispatch, name]);

    const poems = useSelector(store => store.poems.list );

    return ( 
        <Fragment>
            <div className="container authors-cards-container">
                <Author name={name  }/>
                <div id="authors-cards" className="card-columns mt-3">
                    {
                        poems.map(poem =>
                            <Poem poem={poem} key={poem.id} showFull={true}></Poem>
                        )
                    }
                </div>
            </div>
            <GoTopButton />
        </Fragment>
     );
}
 
export default PoemAuthorPage;