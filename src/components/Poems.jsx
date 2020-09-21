import algoliasearch from 'algoliasearch/lite';
import React, { Fragment } from 'react';
import { connectHits, InstantSearch, PoweredBy } from 'react-instantsearch-dom';
// hooks react redux
import { useDispatch, useSelector } from 'react-redux';
import { getPoemsAction } from '../redux/poemsDucks';
import DebouncedSearchBox from './DebouncedSearchBox';
import Poem from './Poem';
import PoemHits from './PoemHits';
import GoTopButton from './GoTopButton';

const Poems = ({ showFull }) => {
  const searchClient = algoliasearch('BSJX5TTZV0', 'cefb7f2f5e85c4db06adbb1e58bf2e0b');
  const poems = useSelector(state => state.poems.list);
  const dispatch = useDispatch();
  const CustomHits = connectHits(PoemHits);

  React.useEffect(() => {
    const obtenerListado = () => {
      dispatch(getPoemsAction())
    }
    obtenerListado()
  }, [dispatch]);

  return (
    <Fragment>
      {showFull ?
        <Fragment>
          <InstantSearch searchClient={searchClient} indexName="dev_POEMS">
            <DebouncedSearchBox delay={1000} />
            <PoweredBy />
            <CustomHits />
          </InstantSearch>
          <GoTopButton />
        </Fragment>
        : <div id="poems-cards" className="card-columns mt-3">
          {
            poems.map(poem =>
              <Poem poem={poem} key={poem.id} showFull={showFull}></Poem>
            )
          }
        </div>
      }
    </Fragment>
  )
}

export default Poems
