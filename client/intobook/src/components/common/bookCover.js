import React from 'react';
import { CardMedia } from '@mui/material';

const BookCover = ({img}) => {
  const imgSrc = img;

  return (
    <div>
      <CardMedia image={imgSrc} sx={{ width: 70, height: 100, borderRadius: '20px' }} />
    </div>
  );
};

export default BookCover;