import React, { Fragment, useState } from 'react'

// hooks react redux
import {useDispatch, useSelector} from 'react-redux';
import { getPoemsAction, searchPoem } from '../redux/poemsDucks';
import Poem from './Poem';

const Poems = ({showFull}) => {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState(null);

    React.useEffect(() => {
        const obtenerListado = () => {
            dispatch(getPoemsAction())
        }
        obtenerListado()
    }, [dispatch]);

    const updateFilter = (e) => {
        setFilter(e.target.value);
    }

    const search = () => {
        const filtrarPoemas = () => {
            dispatch(searchPoem(filter))
        }
        filtrarPoemas()
    }

    const poems = useSelector(store => store.poems.list);

    return (
        <Fragment>
            <div className="input-group input-group-lg mt-3 w-50">
                <input type="text" className="form-control" placeholder="Buscar por autor, poema, título" aria-label="Autor, titulo" onChange={updateFilter}/>
                <div className="input-group-append">
                    <button className="btn btn-dark jam jam-search" onClick={search}></button>
                </div>
            </div>
            <div id="poems-cards" className="card-columns mt-3">
                {
                    poems.map(poem =>
                        <Poem poem={poem} key={poem.id} showFull={showFull}></Poem>
                    )
                }
            </div>
        </Fragment>
    )
}

export default Poems
