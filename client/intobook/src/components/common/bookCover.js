import React from 'react';
import { CardMedia } from '@mui/material';

const BookCover = ({ imgSrc, customStyle }) => {
  const defaultStyle = {
    width: 70,
    height: 100,
    borderRadius: '20px',
  }

  const combinedStyle = { ...defaultStyle, ...customStyle };


  return (
    <>
      <CardMedia image={imgSrc} sx={{ ...combinedStyle }} />
    </>
  );
};

export default BookCover;