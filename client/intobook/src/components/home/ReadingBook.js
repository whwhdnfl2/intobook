import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar, BookCover } from './../common';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { StyledEngineProvider, Container, Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRecoilState } from 'recoil';
import { ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { getReadingBookInfo } from '../../api/userbookApi';
import { styled } from 'styled-components';

const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nowReadingBook, setNowReadingBook] = useRecoilState(ReadingBookAtom);

  useEffect(() => {
    const getReadingBook = async () => {
      const detailInfo = await getReadingBookInfo();
      setNowReadingBook(detailInfo);
    };
    getReadingBook();

  }, [setNowReadingBook]);

  const tempTitle = nowReadingBook?.title;
  const tempAauthor = nowReadingBook?.author;

  const coverImg = nowReadingBook?.coverImage;
  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;
  const author = tempAauthor && tempAauthor.includes('(') ? tempAauthor.split('(')[0].trim() : tempAauthor;
  const userBookId = nowReadingBook?.userBookPk;

  const nowPage = nowReadingBook?.nowPage + 30;
  const progress = Math.floor((nowPage / nowReadingBook?.page) * 100);

  const clickHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <GridContainer>
          <CurrentBook>
            <Link to={`/userbook/${userBookId}`} style={{ textDecoration: 'none' }}>
              {nowReadingBook && <BookCover image={coverImg} />}
            </Link>
            {!nowReadingBook && (
              <AddCircleOutlineIcon
                onClick={clickHandler}
                style={{ color: 'var(--main-green-color)', fontSize: '26px' }}
              />
            )}
          </CurrentBook>
          <CurrentBookStatus>
            {nowReadingBook && (<Typography>{title} - {author}</Typography>)}
            {!nowReadingBook && (<Typography>책을 등록해보세요</Typography>)}
          </CurrentBookStatus>
        </GridContainer>
        <ProgressBar progress={progress} containerWidth={320} />
      </StyledEngineProvider>
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={clickHandler} />
    </>
  );
};

// 이후 styles 폴더로 파일 분리 필요
const GridContainer = styled(Container)`
  width: 320px;
  height: 112px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CurrentBookStatus = styled(Box)`
  width: 220px;
  border-radius: 20px;
  background: #68A4E3;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  `;

const CurrentBook = styled(Box)`
  width: 80px;
  background: #68A4E3;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export default ReadingBook;