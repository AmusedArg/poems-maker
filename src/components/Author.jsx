/* eslint-disable jsx-a11y/anchor-has-content */
import axios from 'axios';
import React, { useState } from 'react';

const Author = ({ poem, name }) => {

  const [picture, setPicture] = useState(null);
  const [summary, setSummary] = useState(null);

  React.useEffect(() => {
    async function getInfo() {
      const res = await axios.get(`https://poemasmaker.firebaseio.com/authors.json?orderBy="$key"&equalTo="${name}"`);
      setPicture(res.data[name]?.picture);
      setSummary(res.data[name]?.summary);
    }
    getInfo();
  });

  return (
    <div className="card shadow-sm author-card mx-auto mt-3">
      <div className="card-body">
        <div className="media">
          {
            picture && <img src={picture} alt={name} className="align-self-center mb-3 author-pic" />
          }
          <div className="media-body ml-3">
            <h5 className="mt-0 poem-author"><a href={`/poems/author/${name}`}>{name}</a></h5>
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