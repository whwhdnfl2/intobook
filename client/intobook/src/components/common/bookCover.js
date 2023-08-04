import React from 'react';

const BookCover = ({ image, customStyle, alt }) => {
  const defaultStyle = {
    width: 70,
    height: 100,
    borderRadius: '20px',
  };

  const combinedStyle = { ...defaultStyle, ...customStyle };

  return (
    <img src={image} alt={alt} style={{ ...combinedStyle }} />
  );
};

export default BookCover;