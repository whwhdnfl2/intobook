import React, { useState, useEffect } from 'react';
import Modal from './../common/Modal';
import { transfer } from '../../assets/img/home'
import { useRecoilValue } from 'recoil';
import { BookmarkStatusAtom, BluetoothAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { Box } from '@mui/material';
import { styled } from 'styled-components';
import { formatTimeDifference } from '../../utils/dateTimeUtils';

const CurrentBookStatus = () => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const nowReadingBook = useRecoilValue(ReadingBookAtom);
  const isConnected = useRecoilValue(BluetoothAtom);
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);

  const tempTitle = nowReadingBook?.title;
  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;

  // 지난 로그 기록 기준 1초마다 갱신
  const lastLog = formatTimeDifference(nowReadingBook?.completedAt);
  const [timeDifference, setTimeDifference] = useState(lastLog);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastLog = formatTimeDifference(nowReadingBook?.completedAt);
      setTimeDifference(lastLog);
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, [nowReadingBook?.completedAt]);

  return (
    <>
      <CurrentBookContainer sx={{ background: nowReadingBook? '#859FF8' : 'var(--white)' }}>
        {nowReadingBook && (
          <Container>
            <Content>{title}</Content>
            {(isConnected && isBookmarkOut) && <Content>새로운 히스토리를 만들어가는 중!</Content>}
            {(!isConnected || (isConnected && !isBookmarkOut)) &&
              <Container>
                {nowReadingBook?.completedAt ? (
                  <div>
                    <Content>마지막 히스토리로 부터</Content>
                    <Content style={{ marginBottom: '5px' }}>
                      <Span>{lastLog} </Span> 
                      지났습니다.
                    </Content>
                  </div>
                ) : (
                  <Content>첫 히스토리를 쌓으러 가보세요!</Content>
                )}
                <ImgContainer onClick={() => { setOpenModal(true) }} >
                  <img src={transfer} alt='책 변경 아이콘' />
                  <div>다른 책 읽기</div>
                </ImgContainer>
              </Container>
            }
          </Container>
        )}
        {!nowReadingBook && (
          <div>
            <Content style={{ color: 'black' }}>지금 읽고 있는 책이 없네요!</Content>
            <Content style={{ color: 'black' }}>북갈피에 읽을 책을 등록해보세요 :)</Content>
          </div>
        )}
      </CurrentBookContainer>
      <Modal openModal={openModal} setOpenModal={setOpenModal} modalType={'readingBook'} closeModal={closeModal} height={'510px'} />
    </>
  );
};

const CurrentBookContainer = styled(Box)`
  width: 220px;
  height: 90px;
  border-radius: 20px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Content = styled.div`
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  letter-spacing: 0.8px;
  font-size: var(--font-h5);
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