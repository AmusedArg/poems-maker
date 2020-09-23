/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Fragment } from 'react';
import ScrollReveal from 'scrollreveal'
import Favorite from '../Favorite';
import SecuredComponent from '../security/SecuredComponent';

const Poem = ({ poem, showFull }) => {
  const slideUp = {
    distance: '150%',
    origin: 'bottom',
    duration: 1000,
    opacity: null
  };
  ScrollReveal().reveal('.card', slideUp);

  let paragraph = '';
  if (showFull) {
    paragraph = poem.fullText;
  } else {
    paragraph = poem.randomParagraph;
  }

  return (
    <div className="card shadow-sm poem-card">
      {
        // Mostrar titulo solo en poemas completos
        showFull &&
        <div className="card-header bg-secondary poem-title text-center font-weight-bold">
          {(poem.id) ? <a href={`/poems/${poem.id}`}>{poem.title}</a> : poem.title}
          <SecuredComponent>
            <Favorite poem={poem}/>
          </SecuredComponent>
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
              <div className="poem-paragraph" dangerouslySetInnerHTML={{ __html: paragraph }}>
              </div>
              <br/>
            </Fragment>
          }
        </div>
        {
          // Mostrar pie del poema con las redes solo en los completos
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
          // Mostrar boton ver poema solo en los cortos
          !showFull &&
          <a href={'/poems/' + poem.id} className="btn btn-primary">Ver poema</a>
        }
      </div>
    </div>
  );
}

export default Poem;