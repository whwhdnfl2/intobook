import React, { useEffect, useState } from 'react';
import { Book } from '../bookShelves'
import { useNavigate } from 'react-router-dom';
import { userbooks, updateUserBookStatus } from './../../api/userbookApi';
import { useSetRecoilState } from 'recoil';
import { ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { Stack, Box } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { ResultsContainer } from '../../styles/bookSearch/SearchStyle';
import { styled } from 'styled-components';

const ReadingBooks = ({ closeModal }) => {
  const [readingBookList, setReadingBookList] = useState([]);
  const setNowReadingBook = useSetRecoilState(ReadingBookAtom);

  const navigate = useNavigate();

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

  // 검색하여 책 등록하기
  const goToSearchPageHandler = () => {
    navigate('/search');
  };

  // status 변경하기
  const editStatusHandler = async (bookInfo) => {
    try {
      await updateUserBookStatus(bookInfo.userBookPk, 'NOWREADING');
      setNowReadingBook(bookInfo);
      closeModal();
    } catch (err) {
      console.err(err);
    } finally {
    }
  };


  return (
    <ModalContent>
      <TitleContainter>
        <ErrorOutlineOutlinedIcon />
        <div>책장에서 책을 선택해주세요</div>
      </TitleContainter>
      <ScrollableResultsContainer>
        <Stack direction='row' flexWrap='wrap' justifyContent='start' columnGap={'25px'} rowGap={'15px'}>
          {readingBookList.length > 0 ? (
            readingBookList.map((book) => (
              <Box key={book.userBookPk}>
                <div onClick={() => editStatusHandler(book)} >
                  <Book bookInfo={book} customStyle={{ width: '72px', height: '98px', marginBottom: '5px' }} width={'73px'} />
                </div>
              </Box>
            ))
          ) : (<p>책이 없습니다.</p>)}
        </Stack>
      </ScrollableResultsContainer>
      <BtnContainter>
        <StatusButton onClick={closeModal} style={{ border: '1px solid var(--main-color)', color: 'var(--main-color)' }}>닫기</StatusButton>
        <StatusButton onClick={goToSearchPageHandler} style={{ background: 'var(--main-color)' }}>검색하여 등록하기</StatusButton>
      </BtnContainter>
    </ModalContent>
  );
};

const ModalContent = styled.div`
  min-width: 240px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
`;

const TitleContainter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--main-font);
  font-size: var(--font-h4);
  gap: 12px;
`;

const ScrollableResultsContainer = styled(ResultsContainer)`
  max-height: 396px;
  overflow-y: auto;
  margin: 30px 0;
`;

const BtnContainter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const StatusButton = styled.button`
  width: 130px;
  height: 30px;
  border-radius: 100px;
  border: none;
  background: var(--white);
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: var(--font-h5);
  letter-spacing: 0.4px;
  cursor: pointer;
`;

export default ReadingBooks;