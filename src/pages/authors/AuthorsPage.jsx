import React, { Fragment } from 'react';
import Author from '../../components/authors/Author';
import { getCachedPoems } from '../../redux/poemsDucks';


const AuthorsPage = () => {
  let poems = getCachedPoems();
  if (!poems) { return null; }
  let filteredPoems = [];

  // Removes duplicated authors
  filteredPoems = poems.filter((p, index, self) =>
    index === self.findIndex((t) => (
      t.author === p.author
    ))
  );

  filteredPoems.sort((a, b) => a.author > b.author ? 1 : -1)

  return (
    <Fragment>
      {
        <div id="poems-cards" className="my-3">
          {
            filteredPoems.map(p =>
              <Author poem={p} name={p.author} key={p.author} />
            )
          }
        </div>
      }
    </Fragment>
  )
}

export default AuthorsPage
