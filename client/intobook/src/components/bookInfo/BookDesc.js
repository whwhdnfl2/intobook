import React, { useState, useEffect } from 'react';
import { getBookDetail } from '../../api/searchApi';
import BookCover from './../common/bookCover';
import { styled } from 'styled-components';

const BookDesc = ({ bookId }) => {
  const [bookInfo, setBookInfo] = useState(null);
  const title = bookInfo?.title.split('-')[0].trim()
  const author = bookInfo?.author.split('(')[0].trim()

  useEffect(() => {
    const getBookInfo = async () => {
      const bookInfo = await getBookDetail(bookId);
      setBookInfo(bookInfo);
    };
    getBookInfo()
  }, [bookId]);

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
`
export default BookDesc;