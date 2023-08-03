// import React from 'react';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { StyledEngineProvider, Container, Box, Typography } from '@mui/material';
import { styled } from 'styled-components';
import ProgressBar from './../common/progressBar';
import BookCover from './../common/bookCover';


const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nowPage = 70
  const imgUrl = "https://i.ytimg.com/vi/1ZhDsPdvl6c/maxresdefault.jpg"


  // 현재 등록한 책과 마지막 로그 기록에 대한 정보 필요

  const clickHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <GridContainer>
          <CurrentBook>
            {/* 현재 등록되어 있는 책이 있다면 커버 이미지 보여주기 */}
            <BookCover img={imgUrl}/>
            {/* 현재 등록되어 있는 책이 없다면 책을 등록할 수 있는 버튼 보여주기 */}
            {/* <AddCircleOutlineIcon onClick={clickHandler} style={{ color: 'var(--main-green-color)', fontSize: '26px'}}/> */}
          </CurrentBook>
          <CurrentBookStatus>
            {/* <Typography>천개의 파랑</Typography> */}
          </CurrentBookStatus>
        </GridContainer>
        <ProgressBar now_page={nowPage} />
      </StyledEngineProvider>
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={clickHandler} />
    </>
  );
};

// 이후 styles 폴더로 파일 분리 필요
const GridContainer = styled(Container)`
  width: 300px;
  height: 112px;
  padding: 0;
  display: flex;
  justify-content: space-between;
`;
  
const CurrentBookStatus = styled(Box)`
  width: 200px;
  border-radius: 20px;
  background: var(--white);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  `;
  
  const CurrentBook = styled(Box)`
  width: 80px;
  background: var(--white);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export default ReadingBook;