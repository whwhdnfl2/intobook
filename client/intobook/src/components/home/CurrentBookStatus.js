import React, { useState, useEffect } from 'react';
import Modal from './../common/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BookmarkStatusAtom, BluetoothAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { formatTimeDifference } from '../../utils/dateTimeUtils';
import { BasicButton, ProgressBar } from '../common';
import { getReadingBookInfo } from '../../api/userbookApi';
import SearchBottomSheet from '../bookSearch/SearchBottomSheet';
import { styled } from 'styled-components';

const CurrentBookStatus = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const isConnected = useRecoilValue(BluetoothAtom);
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);
  const [nowReadingBook, setNowReadingBook] = useRecoilState(ReadingBookAtom);

  const tempTitle = nowReadingBook?.title;
  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;

  // 지난 로그 기록 기준 1초마다 갱신
  const lastLog = formatTimeDifference(nowReadingBook?.completedAt);
  const [timeDifference, setTimeDifference] = useState(lastLog);
  const [openBookInfoModal, setOpenBookInfoModal] = useState(false);
  const nowPage = nowReadingBook?.nowPage + 90;
  const progress = nowReadingBook?.page ? Math.floor((nowPage / nowReadingBook.page) * 100) : 0;
  const [openCompleteBookModal, setOpenCompleteBookModal] = useState(false);

  const searchHandler = () => {
    if (isConnected && isBookmarkOut) {
      // 안내 모달 띄우기
      setOpenBookInfoModal(true);
    } else {
      setIsOpen(true);
    }
  };
  const closeBookInfoModal = () => {
    setOpenBookInfoModal(false);
  };

  const closeCompleteBookModal = () => {
    setOpenCompleteBookModal(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const lastLog = formatTimeDifference(nowReadingBook?.completedAt);
      setTimeDifference(lastLog);
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, [nowReadingBook?.completedAt]);

  useEffect(() => {
    const getReadingBook = async () => {
      const detailInfo = await getReadingBookInfo();
      setNowReadingBook(detailInfo);
      // 진행률 95% 이상일 때 모달 띄우기(nowPage가 0이면 확인 불가)
      if (detailInfo?.nowPage && detailInfo?.page) {
        const nowPage = detailInfo.nowPage + 100;
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

  return (
    <>
      {nowReadingBook && (
        <>
          <Content style={{color:'var(--main-purple-color'}}>{title}</Content>
          {(isConnected && isBookmarkOut) &&
            <>
              <Content>새로운 히스토리를 만들어가는 중!</Content>
            </>
          }
          {(!isConnected || (isConnected && !isBookmarkOut)) &&
            <>
              {nowReadingBook?.completedAt ? (
                <div>
                  <Content>마지막 히스토리로 부터</Content>
                  <Content style={{ marginBottom: '5px' }}>
                    <Span>{lastLog} </Span>
                    지났습니다.
                  </Content>
                  <div
                    style={{ cursor: progress >= 95 ? 'pointer' : 'default' }}
                    onClick={() => { if (progress >= 95) setOpenCompleteBookModal(true); }}
                  >
                    {nowReadingBook && <ProgressBar progress={progress} containerWidth={200} bbg={'#D9D9D9'} />}
                  </div>
                </div>
              ) : (
                <>
                  <Content>첫 히스토리를 쌓으러 가보세요!</Content>
                  <div
                    style={{ cursor: progress >= 95 ? 'pointer' : 'default' }}
                    onClick={() => { if (progress >= 95) setOpenCompleteBookModal(true); }}
                  >
                    {nowReadingBook && <ProgressBar progress={progress} containerWidth={200} bbg={'#D9D9D9'} />}
                  </div>
                </>
              )}
              <ImgContainer onClick={() => { setOpenModal(true) }} >
                <BasicButton content={"다른 책 등록하기"} />
              </ImgContainer>
            </>
          }
        </>
      )}
      {!nowReadingBook && (
        <div>
          <Content style={{ color: 'var(--main-point-color)' }}>지금 읽고 있는 책이 없네요!</Content>
          <Content style={{ color: 'var(--main-point-color)' }}>북갈피에 읽을 책을 등록해보세요 :)</Content>
          <ImgContainer onClick={() => { setOpenModal(true) }} >
            <BasicButton content={"책 찾으러 가기"} />
          </ImgContainer>
        </div>
      )}
      <Modal openModal={openModal} setOpenModal={setOpenModal} modalType={'readingBook'} closeModal={closeModal} height={'510px'} />
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={searchHandler} />
      <Modal openModal={openBookInfoModal} setOpenModal={setOpenBookInfoModal} modalType={'bookmarkInfo'} closeModal={closeBookInfoModal} height={'240px'} />
      <Modal openModal={openCompleteBookModal} setOpenModal={setOpenCompleteBookModal} modalType={'completeBook'} closeModal={closeCompleteBookModal} height={'160px'} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Content = styled.div`
  text-align: center;
  letter-spacing: 0.8px;
  font-size: var(--font-h6);
  margin: 5px 0 8px 0;
  `;

const Span = styled.span`
  color: var(--main-color);
  font-size: 15px;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  gap: 6px;
  cursor: pointer;
`;

export default CurrentBookStatus;