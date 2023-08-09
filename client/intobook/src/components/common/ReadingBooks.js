import React, { useEffect, useState } from 'react';
import { Book } from '../bookShelves'
import { Link } from 'react-router-dom';
import { Stack, Box } from '@mui/material';
import { userbooks } from '../../api/userbookApi';
import { ResultsContainer } from '../../styles/bookSearch/SearchStyle';

import { useRecoilState } from 'recoil';
import { UserBooksAtom } from '../../recoil/user/UserAtom';
import { styled } from 'styled-components';

const ReadingBooks = () => {
  // const [userBooks, setUserBooks] = useRecoilState(UserBooksAtom);
  const [readingBookList, setReadingBookList] = useState([]);

  useEffect(() => {
    getReadingBooks();
  }, [])

  // status가 'READING'인 책 
  const getReadingBooks = async () => {
    try {
      const bookList = await userbooks('startedAt', 0, 'READING');
      setReadingBookList((prev) => bookList);
      return bookList;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <ModalContent>
        <div>
          <ResultsContainer>
            <Stack direction='row' flexWrap='wrap' justifyContent='start' columnGap={3.5} rowGap={1.5}>
              {readingBookList.length > 0 ? (
                readingBookList.map((book) => (
                  <Box key={book.userBookPk}>
                    <Link to={`/userbook/${book.userBookPk}`} style={{ textDecoration: 'none' }}>
                      <Book bookInfo={book} />
                    </Link>
                  </Box>
                ))
              ) : (<p>책이 없습니다.</p>)}
            </Stack>
          </ResultsContainer>
        </div>
      </ModalContent>
    </div>
  );
};

const ModalContent = styled.div`
  min-width: 240px;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ReadingBooks;