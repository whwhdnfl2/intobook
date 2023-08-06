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
      <BookInfoInnerDiv>
        <BookCover image={bookInfo?.coverImage} alt={title + 'image'}
          customStyle={{ width: '80px', border: '2px solid white', marginRight: '10px' }}
        />
        <div>
          <div style={{ fontSize: 'var(--font-h4)', color: 'var(--white)' }}>{title}</div>
          <div style={{ fontSize: 'var(--font-h5)', margin: 1 }}>{author}</div>
          <div style={{ fontSize: 'var(--font-h6)', color: '#AFB1B6', marginBottom: '13px' }}>{bookInfo?.publisher}</div>
          <span style={{ fontSize: 'var(--font-h6)',  color: '#AFB1B6', marginRight: '5px' }}>Pages</span>
          <span style={{ fontSize: 'var(--font-h6)' }} >{bookInfo?.page}p</span>
        </div>
      </BookInfoInnerDiv>
    </BookInfoDiv>
  );
};

const BookInfoDiv = styled.div`
  width: 320px;
  height: 140px;
  flex-shrink: 0;
  background-color: var(--main-color);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookInfoInnerDiv = styled.div`
  width: 286px;
  height: 106px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid var(--white);
  background: rgba(109, 180, 166, 0.00);
  display: flex;
  padding: 10px;
`;

export default BookDesc;