import React, { Fragment } from 'react'
import Poem from './Poem';

const PoemHits = ({hits}) => {
    return ( 
        <Fragment>
             <div id="poems-cards" className="card-columns mt-3">
                {
                    hits.map(poem => {
                        poem['id'] = poem.objectID;
                        poem['paragraphs'] = poem.content;
                        delete poem.content;
                        delete poem.objectID;
                        return <Poem poem={poem} key={poem.id} showFull={true}></Poem>
                    })
                }
            </div>
        </Fragment>
     );
}

export default PoemHits;