import React from 'react';
import BookCover from './../common/bookCover';
import { styled } from 'styled-components';

const BookDesc = ({ bookInfo }) => {
  const tempTitle = bookInfo?.title;
  const tempAauthor = bookInfo?.author;
  
  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;
  const author = tempAauthor && tempAauthor.includes('(') ? tempAauthor.split('(')[0].trim() : tempAauthor;

  return (
    <BookInfoDiv>
      <div style={{ display: 'flex' }}>
        <BookCover image={bookInfo?.coverImage} alt={title + 'image'}
          customStyle={{ width: '80px', border: '2px solid white' }}
        />
        <div>
          <div style={{ fontSize: 'var(--font-h3)' }}>{title}</div>
          <div style={{ fontSize: 'var(--font-h5)', margin: 1 }}>{author}</div>
          <div style={{ fontSize: 'var(--font-h6)', margin: 0 }}>{bookInfo?.publisher}</div>
          <p>pages: {bookInfo?.page}p</p>
        </div>
      </div>
    </BookInfoDiv>
  );
};

const BookInfoDiv = styled.div`
  width: 320px;
  height: 140px;
  background-color: var(--main-color);
  border-radius: 20px;
`;

export default BookDesc;