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
                        return <Poem poem={poem} key={poem.objectID} showFull={true}></Poem>
                    })
                }
            </div>
        </Fragment>
     );
}

export default PoemHits;