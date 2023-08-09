import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar, BookCover } from './../common';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { StyledEngineProvider, Container, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRecoilValue } from 'recoil';
import { ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import CurrentBookStatus from './CurrentBookStatus';
import { styled } from 'styled-components';

const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nowReadingBook = useRecoilValue(ReadingBookAtom);

  const coverImg = nowReadingBook?.coverImage;
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
              {nowReadingBook && <BookCover image={coverImg} customStyle={{ border: 'none' }} />}
            </Link>
            {!nowReadingBook && (
              <AddCircleOutlineIcon
                onClick={clickHandler}
                style={{ color: 'var(--main-green-color)', fontSize: '26px' }}
              />
            )}
          </CurrentBook>
          <CurrentBookStatus />
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

const CurrentBook = styled(Box)`
width: 80px;
height: 110px;
background: #859FF8;
box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;
`;

export default ReadingBook;