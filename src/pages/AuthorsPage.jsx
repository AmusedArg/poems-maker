import React, { Fragment } from 'react';
import Author from '../components/Author';
import { getCachedPoems } from '../redux/poemsDucks';


const AuthorsPage = () => {
    let poems = getCachedPoems();
    let filteredPoems = [];
    
    // Removes duplicated authors
    filteredPoems = poems.filter((p, index, self) =>
        index === self.findIndex((t) => (
        t.author === p.author
        ))
    );

    return (
        <Fragment>
            {   
                <div id="poems-cards" className="my-3">
                    {
                        filteredPoems.map(p =>
                            <Author poem={p} key={p.author}/>
                        )
                    }
                </div>
            }
        </Fragment>
    )
}

export default AuthorsPage
