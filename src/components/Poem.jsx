/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Fragment } from 'react';
import ScrollReveal from 'scrollreveal'

const Poem = ({ poem, showFull }) => {
  const slideUp = {
    distance: '150%',
    origin: 'bottom',
    duration: 1000,
    opacity: null
  };
  ScrollReveal().reveal('.card', slideUp);

  let text = '';
  if (showFull) {
    text = poem.fullText;
  } else {
    text = poem.randomParagraph;
  }

  return (
    <div className="card shadow-sm poem-card">
      {
        showFull &&
        <div className="card-header bg-secondary poem-title text-center font-weight-bold">
          {(poem.id) ? <a href={`/poems/${poem.id}`}>{poem.title}</a> : poem.title}
        </div>
      }
      <div className="card-body">
        <div className="card-text">
          {showFull
            ? poem.paragraphs?.map((elem, i) => {
              // Para casos donde se obtienen desde Algolia y no desde firebase
              elem.text = elem.text.replace(/\n/g, "<br />");
              return (
                <Fragment key={i}>
                  <div className="poem-paragraph" dangerouslySetInnerHTML={{ __html: elem.text }}></div>
                  <br />
                </Fragment>
              )
            })
            : <Fragment>
              <div className="poem-paragraph" dangerouslySetInnerHTML={{ __html: text }}>
              </div>
              <br/>
            </Fragment>
          }
        </div>
        {
          showFull &&
          <div className="text-right">
            <a href={`/poems/author/${poem.author}`} className="author-link"><span className="poem-author">{poem.author}</span></a>
            <div className="social-links-container">
              {poem.instagram && <a href={poem.instagram} target="_blank" rel="noopener noreferrer" className="social-icon jam jam-instagram"></a>}
              {poem.twitter && <a href={poem.twitter} target="_blank" rel="noopener noreferrer" className="social-icon jam jam-twitter"></a>}
              {poem.website && <a href={poem.website} target="_blank" rel="noopener noreferrer" className="social-icon jam jam-world"></a>}
            </div>
          </div>
        }
        {
          !showFull &&
          <a href={'/poems/' + poem.id} className="btn btn-primary">Ver poema</a>
        }
      </div>
    </div>
  );
}

export default Poem;