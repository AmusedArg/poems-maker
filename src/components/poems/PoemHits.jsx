import React, { Fragment } from 'react'
import Poem from './Poem';

const PoemHits = ({ hits }) => {
  return (
    <Fragment>
      <div id="poems-cards" className="card-columns mt-3">
        {
          hits.map(poem => {
            const _poem = Object.assign({}, poem);
            _poem['id'] = poem.objectID;
            _poem['paragraphs'] = poem.content;
            delete _poem.content;
            delete _poem.objectID;
            return <Poem poem={_poem} key={_poem.id} showFull={true}></Poem>
          })
        }
      </div>
    </Fragment>
  );
}

export default PoemHits;