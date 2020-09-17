import React, { Fragment } from 'react';
import { getCachedPoems } from '../redux/poemsDucks';

const AuthorsList = () => {
    let poems = getCachedPoems();
    // Removes duplicated authors
    poems = poems.filter((p, index, self) =>
        index === self.findIndex((t) => (
        t.author === p.author
        ))
    );
    
    return ( 
        <Fragment>
            <div className="authors-list">
            {
                poems.map(p => {
                  return <li key={p.id}><a href={`/poems/author/${p.author}`}>{p.author}</a></li>;
                })
            }
            </div>
        </Fragment>
     );
}
 
export default AuthorsList;