import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

export default connectSearchBox(({ refine, delay }) => {
  const onChange = e => {
    e.persist();
    setTimeout(() => refine(e.target.value), delay);
  };

  return (
    <div className="ais-SearchBox">
      <input className="form-control" placeholder="Buscar autores, poemas, títulos..." onChange={onChange} />
    </div>
  )
});
