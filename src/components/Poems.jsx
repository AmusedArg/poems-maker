import algoliasearch from 'algoliasearch/lite';
import React, { Fragment } from 'react';
import { connectHits, InstantSearch, PoweredBy } from 'react-instantsearch-dom';
// hooks react redux
import { useDispatch, useSelector } from 'react-redux';
import { getPoemsAction } from '../redux/poemsDucks';
import DebouncedSearchBox from './DebouncedSearchBox';
import Poem from './Poem';
import PoemHits from './PoemHits';


const Poems = ({showFull}) => {
    const searchClient = algoliasearch('BSJX5TTZV0', '0a9741b44edd02761e785312932bed41');

    const dispatch = useDispatch();

    React.useEffect(() => {
        const obtenerListado = () => {
            dispatch(getPoemsAction())
        }
        obtenerListado()
    }, [dispatch]);

    const poems = useSelector(store => store.poems.list);
    const CustomHits = connectHits(PoemHits);

    return (
        <Fragment>
            {   showFull ?
                <InstantSearch searchClient={searchClient} indexName="dev_POEMS">
                    <DebouncedSearchBox delay={1000} />
                    {/* <SearchBox translations={{
                        submitTitle: 'Buscar',
                        resetTitle: 'Cancelar',
                        placeholder: 'Buscar autores, poemas, títulos...',
                    }}/> */}
                    <PoweredBy />
                    <CustomHits/>
                </InstantSearch>
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
