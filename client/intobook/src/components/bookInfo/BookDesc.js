import React from 'react';
import BookCover from './../common/bookCover';
import { styled } from 'styled-components';

const BookDesc = ({ bookInfo }) => {
  const tempTitle = bookInfo?.title;
  const tempAauthor = bookInfo?.author;

  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;
  const author = tempAauthor && tempAauthor.includes('(') ? tempAauthor.split('(')[0].trim() : tempAauthor;

  const status = bookInfo?.status;

  const statusInfo =
    status === 'NOWREADING' ? '읽고 있는 책이에요' :
      status === 'READING' ? '읽다 멈춘 책이에요' : '다 읽은 책이에요'

  return (
    <BookInfoDiv>
      <BookCover image={bookInfo?.coverImage} alt={title + 'image'}
        customStyle={{ width: '80px', height: '120px', border: '2px solid white', marginRight: '10px' }}
      />
      <BookInfoContentDiv>
        <div style={{ fontSize: 'var(--font-h3)', color: 'var(--white)' }}>{title}</div>
        <TempDiv>
          <div>
            <div style={{ fontSize: 'var(--font-h5)', marginBottom: '3px' }}>{author}</div>
            <div style={{ fontSize: 'var(--font-h6)', color: '#AFB1B6' }}>{bookInfo?.publisher}</div>
            <span style={{ fontSize: 'var(--font-h6)', color: '#AFB1B6' }}>{bookInfo?.page}p</span>
          </div>
          <LabelDiv>{ }</LabelDiv>
        </TempDiv>
      </BookInfoContentDiv>
    </BookInfoDiv>
  );
};

const BookInfoDiv = styled.div`
  width: 310px;
  height: 140px;
  flex-shrink: 0;
  background-color: #5A7FFF;
  border-radius: 20px;
  display: flex;
  padding-left: 10px;
  // justify-content: center;
  align-items: center;
`;

const BookInfoContentDiv = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  height: 120px; 
  padding: 5px;
  margin: 0;
`;

const LabelDiv = styled.div`
  width: 150px;
  height: 40px;
  flex-shrink: 0;
  background: #00A887;
`;


const TempDiv = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
`;
export default BookDesc;