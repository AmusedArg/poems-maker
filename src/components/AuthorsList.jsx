import React, { Fragment } from 'react';
import { getCachedPoems } from '../redux/poemsDucks';

const AuthorsList = () => {
  let poems = getCachedPoems();
  if (!poems) { return null; }
  // Removes duplicated authors
  poems = poems.filter((p, index, self) =>
    index === self.findIndex((t) => (
      t.author === p.author
    ))
  );

  poems.sort((a, b) => a.author > b.author ? 1 : -1)

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