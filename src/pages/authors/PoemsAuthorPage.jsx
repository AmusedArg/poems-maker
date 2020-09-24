import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Poem from '../../components/poems/Poem';
import { getPoemsByAuthorAction } from '../../redux/poemsDucks';
import GoTopButton from '../../components/GoTopButton';
import Author from '../../components/authors/Author';

const PoemsAuthorPage = () => {

  let { name } = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const obtenerPoem = () => {
      dispatch(getPoemsByAuthorAction(name))
    }
    obtenerPoem()
  }, [dispatch, name]);

  const poems = useSelector(state => state.poems.list);

  return (
    <Fragment>
      <div className="container authors-cards-container">
        <Author name={name} />
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

export default PoemsAuthorPage;