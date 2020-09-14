import React from 'react'

const PoemOfDay = ({poem}) => {
    return ( 
        <div className="flex-fill align-self-md-center align-self-sm-auto mt-5 mt-md-0 mt-lg-0 fade-in">
          <span className="d-flex justify-content-center" dangerouslySetInnerHTML={{__html: poem.text}}></span>
          <span className="d-flex justify-content-end mr-5 poem-day-author">{poem.author}</span>
          <span className="d-flex justify-content-end mr-5 poem-day-book">{poem.title}</span>
        </div>
     );
}
 
export default PoemOfDay;