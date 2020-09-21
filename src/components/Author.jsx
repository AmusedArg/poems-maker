/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { useSelector } from 'react-redux';

const Author = ({ poem, name }) => {
  const authors = useSelector(state => state.authors.list);

  let authorInfo;

  for (const author of authors) {
    if (author[0] === name) {
      authorInfo = author[1];
      break;
    }
  }

  if (!authorInfo) { return null;}

  const picture = authorInfo.picture;
  const summary = authorInfo.summary;

  return (
    <div className="card shadow-sm author-card mx-auto mt-3">
      <div className="card-body">
        <div className="media">
          {
            picture && <img src={picture} alt={name} className="align-self-center mb-3 author-pic d-none d-lg-block" />
          }
          <div className="media-body ml-3">
            <h5 className="mt-0 poem-author">
            {
              picture && <img src={picture} alt={name} className="small-author-pic d-md-none" />
            }
            <a href={`/poems/author/${name}`}>{name}</a>
            </h5>
            <p>{summary}</p>
          </div>
        </div>
        {
          <div className="text-right">
            <div className="social-links-container">
              {(poem && poem.instagram) && <a href={poem.instagram} target="_blank" rel="noopener noreferrer" className="social-icon jam jam-instagram ml-0 mr-2" title="Seguir en instagram"></a>}
              {(poem && poem.twitter) && <a href={poem.twitter} target="_blank" rel="noopener noreferrer" className="social-icon jam jam-twitter ml-0 mr-2" title="Seguir en twitter"></a>}
              {(poem && poem.website) && <a href={poem.website} target="_blank" rel="noopener noreferrer" className="social-icon jam jam-world ml-0 mr-2"></a>}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Author;