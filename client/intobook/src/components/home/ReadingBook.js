import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar, BookCover, Modal } from './../common';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { StyledEngineProvider, Container, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import CurrentBookStatus from './CurrentBookStatus';
import { styled } from 'styled-components';

const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isConnected = useRecoilValue(BluetoothAtom);
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);
  const nowReadingBook = useRecoilValue(ReadingBookAtom);

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const coverImg = nowReadingBook?.coverImage;
  const userBookId = nowReadingBook?.userBookPk;
  const nowPage = nowReadingBook?.nowPage + 30;
  const progress = Math.floor((nowPage / nowReadingBook?.page) * 100);

  const searchHandler = () => {
    if (isConnected && isBookmarkOut) {
      // 안내 모달 띄우기
      console.log('1111')
      setOpenModal(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <GridContainer>
          <CurrentBook sx={{ background: nowReadingBook? '#859FF8' : 'var(--white)' }}>
            <Link to={`/userbook/${userBookId}`} style={{ textDecoration: 'none' }}>
              {nowReadingBook && <BookCover image={coverImg} customStyle={{ border: '2px solid white' }} />}
            </Link>
            {!nowReadingBook && (
              <AddCircleOutlineIcon
                onClick={searchHandler}
                style={{ color: 'var(--main-green-color)', fontSize: '26px', cursor: 'pointer' }}
              />
            )}
          </CurrentBook>
          <CurrentBookStatus />
        </GridContainer>
        {nowReadingBook && <ProgressBar progress={progress} containerWidth={320} bbg={'#D9D9D9'} />}
      </StyledEngineProvider>
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={searchHandler} />
      <Modal openModal={openModal} setOpenModal={setOpenModal} modalType={'bookmarkInfo'} closeModal={closeModal} height={'240px'} />
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
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ReadingBook;