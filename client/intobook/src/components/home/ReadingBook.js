import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar, BookCover, Modal } from './../common';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { getReadingBookInfo } from '../../api/userbookApi';
import { StyledEngineProvider, Container, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from 'styled-components';

const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);  //이건 무슨 상태이지
  const isConnected = useRecoilValue(BluetoothAtom);  //블투연결되어있는지
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);  //책갈피 인인지, 아웃인지
  const [openBookInfoModal, setOpenBookInfoModal] = useState(false);  //책정보 모달
  const [nowReadingBook, setNowReadingBook] = useRecoilState(ReadingBookAtom);  //지금 읽는 책이 있는지 없는지
  // const [openCompleteBookModal, setOpenCompleteBookModal] = useState(false);  //완료시 뜨는 모달

  useEffect(() => {
    const getReadingBook = async () => {
      const detailInfo = await getReadingBookInfo();
      setNowReadingBook(detailInfo);
      
      // 진행률 95% 이상일 때 모달 띄우기
      // if (detailInfo?.nowPage && detailInfo?.page) {
      //   const nowPage = detailInfo.nowPage + 30;
      //   const progress = Math.floor((nowPage / detailInfo.page) * 100);

      //   if (progress >= 95) {
      //     // localStorage 값 설정
      //     const modalVal = localStorage.getItem('hasCloseCompleteBookModal')
      //     if (modalVal === null) {
      //       localStorage.setItem('hasCloseCompleteBookModal', 'false');
      //     }
      //     // localStorage 값이 true가 아닐 때만 모달 띄우기
      //     if (modalVal !== 'true') {
      //       setOpenCompleteBookModal(true);
      //     }
      //   }
      // }
    };
    getReadingBook();

  }, [setNowReadingBook]);

  const closeBookInfoModal = () => {
    setOpenBookInfoModal(false);
  };

  // const closeCompleteBookModal = () => {
  //   setOpenCompleteBookModal(false);
  // };

  const searchHandler = () => {
    if (isConnected && isBookmarkOut) {
      // 안내 모달 띄우기
      setOpenBookInfoModal(true);
    } else {
      setIsOpen(true);
    }
  };

  const coverImg = nowReadingBook?.coverImage;
  const userBookId = nowReadingBook?.userBookPk;
  
  return (
    <>
          <Link to={`/userbook/${userBookId}`} style={{ textDecoration: 'none' }}>
            {nowReadingBook && <BookCover image={coverImg} customStyle={{ border: '2px solid white', width: '80px', height: '110px' }} />}
          </Link>
          {!nowReadingBook && (
            <>
              <CurrentBook sx={{ background: 'var(--white)' }}>
                <AddCircleOutlineIcon
                  onClick={searchHandler}
                  style={{ color: 'var(--main-point-color)', fontSize: '26px', cursor: 'pointer' }}
                />
              </CurrentBook>
            </>
          )}
      
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={searchHandler} />
      <Modal openModal={openBookInfoModal} setOpenModal={setOpenBookInfoModal} modalType={'bookmarkInfo'} closeModal={closeBookInfoModal} height={'240px'} />
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