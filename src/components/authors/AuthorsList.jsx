import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorsAction } from '../../redux/authorsDucks';

/**
 * List of authors in the footer
 */
const AuthorsList = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const obtenerPoem = () => {
      dispatch(getAuthorsAction())
    }
    obtenerPoem()
  }, [dispatch]);

  let authors = useSelector(state => state.authors.list);

  return (
    <Fragment>
      <div className="authors-list">
        {
          authors.map((p, index) => {
            const author = p[0];
            return <li key={index}><a href={`/poems/author/${author}`}>{author}</a></li>;
          })
        }
      </div>
    </Fragment>
  );
}

export default AuthorsList;