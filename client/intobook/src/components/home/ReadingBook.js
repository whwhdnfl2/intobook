import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookCover, Modal } from './../common';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { getReadingBookInfo } from '../../api/userbookApi';
import { Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from 'styled-components';

const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);  //이건 무슨 상태이지
  const isConnected = useRecoilValue(BluetoothAtom);  //블투연결되어있는지
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);  //책갈피 인인지, 아웃인지
  const [openBookInfoModal, setOpenBookInfoModal] = useState(false);  //책정보 모달
  const [nowReadingBook, setNowReadingBook] = useRecoilState(ReadingBookAtom);  //지금 읽는 책이 있는지 없는지

  useEffect(() => {
    const getReadingBook = async () => {
      const detailInfo = await getReadingBookInfo();
      setNowReadingBook(detailInfo);
    };
    getReadingBook();

  }, [setNowReadingBook]);

  const closeBookInfoModal = () => {
    setOpenBookInfoModal(false);
  };

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