import React from 'react';

const GoTopButton = () => {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <div className="go-top-btn">
      <button onClick={goTop}><span className="jam jam-chevron-circle-up-f"></span></button>
    </div>
  );
}

export default GoTopButton;