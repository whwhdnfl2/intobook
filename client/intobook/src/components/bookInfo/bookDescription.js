import React from 'react';

const BookDescription = ({ bookInfo }) => {
  return (
    <div>
      <h3>책 소개</h3>
      <p>{bookInfo.description}</p>
    </div>
  );
};

export default BookDescription;