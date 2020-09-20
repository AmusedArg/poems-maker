import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPoemAction } from '../redux/poemDucks';
import { useParams } from 'react-router-dom';
import Poem from '../components/Poem';

const PoemPage = () => {

  let { id } = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const obtenerPoem = () => {
      dispatch(getPoemAction(id))
    }
    obtenerPoem()
  }, [dispatch, id]);

  const poem = useSelector(state => state.poem.poem);

  return (
    <Fragment>
      <div className="container mt-3 mb-3 col-md-4">
        <Poem poem={poem} showFull={true}></Poem>
      </div>
    </Fragment>
  );
}

export default PoemPage;