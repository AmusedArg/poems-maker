import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRandomPoemAction } from '../redux/poemDucks';
import Poem from '../components/Poem';

const RandomPoemPage = () => {

    const dispatch = useDispatch();
  
    React.useEffect(() => {
        const obtenerPoem = () => {
            dispatch(getRandomPoemAction())
        }
        obtenerPoem()
    }, [dispatch]);

    const poem = useSelector(store => store.poem.poem );

    return ( 
        <Fragment>
            <div className="container mt-3 mb-3 col-md-8">
                { !poem &&
                    <div className="text-center">
                        <div className="spinner-border text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                {poem && <Poem poem={poem} showFull={true}></Poem>}
            </div>
        </Fragment>
     );
}
 
export default RandomPoemPage;