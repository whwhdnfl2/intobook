import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar, BookCover, Modal } from './../common';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import CurrentBookStatus from './CurrentBookStatus';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { getReadingBookInfo } from '../../api/userbookApi';
import { StyledEngineProvider, Container, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from 'styled-components';

const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isConnected = useRecoilValue(BluetoothAtom);
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);
  const [openBookInfoModal, setOpenBookInfoModal] = useState(false);
  const [openCompleteBookModal, setOpenCompleteBookModal] = useState(false);
  const [nowReadingBook, setNowReadingBook] = useRecoilState(ReadingBookAtom);

  useEffect(() => {
    const getReadingBook = async () => {
      const detailInfo = await getReadingBookInfo();
      setNowReadingBook(detailInfo);

      // 진행률 95% 이상일 때 모달 띄우기
      if (detailInfo?.nowPage && detailInfo?.page) {
        const nowPage = detailInfo.nowPage + 30;
        const progress = Math.floor((nowPage / detailInfo.page) * 100);

        if (progress >= 95) {
          // localStorage 값 설정
          const modalVal = localStorage.getItem('hasCloseCompleteBookModal')
          if (modalVal === null) {
            localStorage.setItem('hasCloseCompleteBookModal', 'false');
          }
          // localStorage 값이 true가 아닐 때만 모달 띄우기
          if (modalVal !== 'true') {
            setOpenCompleteBookModal(true);
          }
        }
      }
    };
    getReadingBook();

  }, [setNowReadingBook]);

  const closeBookInfoModal = () => {
    setOpenBookInfoModal(false);
  };

  const closeCompleteBookModal = () => {
    setOpenCompleteBookModal(false);
  };

  const searchHandler = () => {
    if (isConnected && isBookmarkOut) {
      // 안내 모달 띄우기
      openBookInfoModal(true);
    } else {
      setIsOpen(true);
    }
  };

  const coverImg = nowReadingBook?.coverImage;
  const userBookId = nowReadingBook?.userBookPk;
  const nowPage = nowReadingBook?.nowPage + 90;
  const progress = nowReadingBook?.page ? Math.floor((nowPage / nowReadingBook.page) * 100) : 0;

  return (
    <>
      <StyledEngineProvider injectFirst>
        <GridContainer>
          <Link to={`/userbook/${userBookId}`} style={{ textDecoration: 'none' }}>
            {nowReadingBook && <BookCover image={coverImg} customStyle={{ border: '2px solid white', width: '80px', height: '110px' }} />}
          </Link>
          {!nowReadingBook && (
            <>
              <CurrentBook sx={{ background: nowReadingBook ? '#859FF8' : 'var(--white)' }}>
                <AddCircleOutlineIcon
                  onClick={searchHandler}
                  style={{ color: 'var(--main-green-color)', fontSize: '26px', cursor: 'pointer' }}
                />
              </CurrentBook>
            </>
          )}
          <CurrentBookStatus />
        </GridContainer>
        <div
          style={{ cursor: progress >= 95 ? 'pointer' : 'default' }}
          onClick={() => { if (progress >= 95) setOpenCompleteBookModal(true); }}
        >
          {nowReadingBook && <ProgressBar progress={progress} containerWidth={320} bbg={'#D9D9D9'} />}
        </div>
      </StyledEngineProvider>
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={searchHandler} />
      <Modal openModal={openBookInfoModal} setOpenModal={setOpenBookInfoModal} modalType={'bookmarkInfo'} closeModal={closeBookInfoModal} height={'240px'} />
      <Modal openModal={openCompleteBookModal} setOpenModal={setOpenCompleteBookModal} modalType={'completeBook'} closeModal={closeCompleteBookModal} height={'160px'} />
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
  margin-top: 50px;
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