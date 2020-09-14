import React from 'react'

// hooks react redux
import {useDispatch, useSelector} from 'react-redux';
import { getPoemsAction } from '../redux/poemsDucks';
import Poem from './Poem';

const Poems = ({showFull}) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const obtenerListado = () => {
            dispatch(getPoemsAction())
        }
        obtenerListado()
    }, [dispatch]);

    const poems = useSelector(store => store.poems.list);

    return (
        <div id="poems-cards" className="card-columns mt-3">
            {
                poems.map(poem => {
                    const pos = Math.floor(Math.random() * poem.paragraphs.length-1) + 1;
                    poem = {
                            id: poem.id,
                            author: poem.author,
                            website: poem.website,
                            twitter: poem.twitter,
                            instagram: poem.instagram,
                            title: poem.title,
                            paragraphs: poem.paragraphs,
                            randomParagraph: poem.paragraphs[pos].text,
                            fullText: poem.paragraphs.map(function(elem){
                                return elem.text;
                            }).join("<br><br>")
                    }
                    return (
                        <Poem poem={poem} key={poem.id} showFull={showFull}></Poem>
                    )
                })
            }
        </div>
    )
}

export default Poems
