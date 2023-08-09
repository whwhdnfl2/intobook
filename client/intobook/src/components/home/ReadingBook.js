import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar, BookCover } from './../common';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { StyledEngineProvider, Container, Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { getReadingBookInfo } from '../../api/userbookApi';
import { transfer } from '../../assets/img/home'

import { styled } from 'styled-components';

const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nowReadingBook, setNowReadingBook] = useRecoilState(ReadingBookAtom);
  const isConnected = useRecoilValue(BluetoothAtom);
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);
  const readingBook = useRecoilValue(ReadingBookAtom);


  useEffect(() => {
    const getReadingBook = async () => {
      const detailInfo = await getReadingBookInfo();
      setNowReadingBook(detailInfo);
    };
    getReadingBook();

  }, [setNowReadingBook]);

  const tempTitle = nowReadingBook?.title;
  // const tempAauthor = nowReadingBook?.author;

  const coverImg = nowReadingBook?.coverImage;
  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;
  // const author = tempAauthor && tempAauthor.includes('(') ? tempAauthor.split('(')[0].trim() : tempAauthor;
  const userBookId = nowReadingBook?.userBookPk;

  const nowPage = nowReadingBook?.nowPage + 30;
  const progress = Math.floor((nowPage / nowReadingBook?.page) * 100);

  const clickHandler = () => {
    setIsOpen(true);
  };


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
          <CurrentBookStatus>
            {nowReadingBook && (
              <div>
                <Content>{title}</Content>
                {(isConnected && isBookmarkOut) && <Content>새로운 히스토리를 만들어가는 중!</Content>}
                {(!isConnected || (isConnected && !isBookmarkOut)) &&
                  <div>
                    {nowReadingBook?.completedAt ? (
                      <div>
                        <Content style={{ marginBottom: 0 }}>마지막 히스토리로 부터</Content>
                        <Content>{lastLog} 지났습니다.</Content>
                      </div>
                    ) : (
                      <Content>첫 히스토리를 쌓으러 가보세요!</Content>
                    )}
                    <ImgContainer>
                      <img src={transfer} alt='책 변경 아이콘' />
                      <div>다른 책 읽기</div>
                    </ImgContainer>
                  </div>
                }
              </div>
            )}
            {!nowReadingBook && (<Typography>책을 등록해보세요</Typography>)}
          </CurrentBookStatus>
        </GridContainer>
        <ProgressBar progress={progress} containerWidth={320} />
      </StyledEngineProvider>
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={clickHandler} />
    </>
  );
};

function formatTimeDifference(lastDate) {
  const currentDate = new Date();
  const previousDate = new Date(lastDate);
  const timeDifference = Math.floor((currentDate - previousDate) / 1000); // 차이를 초로 계산

  if (timeDifference < 60) {
    return `${timeDifference}초`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes}분`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    return `${hours}시간 ${minutes}분`;
  } else {
    const days = Math.floor(timeDifference / 86400);
    const hours = Math.floor((timeDifference % 86400) / 3600);
    return `${days}일 ${hours}시간`;
  }
}

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
  height: 110px;
  border-radius: 20px;
  background: #859FF8;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Content = styled(Typography)`
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: var(--font-h5);
  letter-spacing: 0.8px;
  margin-bottom: 5px;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  gap: 6px;
  cursor: pointer;
`;

export default ReadingBook;