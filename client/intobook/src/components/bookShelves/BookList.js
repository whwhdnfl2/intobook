import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userbooks } from '../../api/userbookApi';
import { useRecoilState } from 'recoil';
import { UserBooksAtom } from '../../recoil/user/UserAtom';
import { Stack, Box } from '@mui/material';
import Book from './Book'
import useInfiniteScroll from './../../utils/useInfiniteScroll';
import { styled } from 'styled-components';

const ListContainer = styled.div`
  width: 350px;
  height: 450px;
  margin: 10px auto;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const BookList = ({ bookStatus, orderBy, pageKind }) => {
  const [userBooks, setUserBooks] = useRecoilState(UserBooksAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchBooks = async () => {
    try {
      const response = await userbooks(orderBy, page, bookStatus);
      
      if (response.content.length === 0) {
        setHasMore(false);
      } else {
        setUserBooks((prev) => [...prev, ...response.content]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const targetRef = useInfiniteScroll(fetchBooks);

  useEffect(() => {
    setUserBooks([]);
    setHasMore(true);
    userbooks(orderBy, 0, bookStatus).then(val => {
      setPage(1);
      setUserBooks(val.content);
      setIsLoading(false);
      setHasMore(true);
    });
  }, [bookStatus, orderBy]);

  return (
    <div>
      <ListContainer>
        <Stack direction='row' flexWrap='wrap' justifyContent='space-between' columnGap={3.5} rowGap={3.5}>
          {userBooks.length > 0 ? (
            userBooks.map((book, idx) => (
              <Box key={idx}>
                <Link to={`/userbook/${book.userBookPk}`} style={{ textDecoration: 'none' }}>
                  <Book bookInfo={book} customStyle={{ width: '88px', height: '120px', marginBottom: '5px' }} width={'88px'} />
                </Link>
              </Box>
            ))
          ) : (<p>책이 없습니다.</p>)}
          {hasMore && !isLoading && (<div ref={targetRef}>로딩중</div>)}
        </Stack>
      </ListContainer>
    </div>
  );
}

export default BookList;