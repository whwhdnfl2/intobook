// import React from 'react';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { StyledEngineProvider, Container, Box, Typography } from '@mui/material';
import { styled } from 'styled-components';
import blutetooth from '../../assets/img/character/bluetooth.png'

const ReadingBook = () => {
  const bluetoothSrc = blutetooth;
  const [isOpen, setIsOpen] = useState(false);

  // 현재 등록한 책과 마지막 로그 기록에 대한 정보 필요

  const clickHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <GridContainer>
          <BookBox>
          {/* 현재 등록한 책 있을 경우 그책 cover 이미지 보여주기 */}
            <Typography>현재 등록 책</Typography>
            <BluetoothImg src={bluetoothSrc} alt='bluetooth-icon' />
          </BookBox>
          <ContentBox>
            {/* 등록한 책이 있고, 로그 기록이 하나라도 있다면 마지막 로그 기록 보여주기 */}
            <Typography>마지막 로그 기록</Typography>
            <AddCircleOutlineIcon onClick={clickHandler} style={{ color: 'var(--main-green-color)', fontSize: '26px' }}/>
          </ContentBox>
        </GridContainer>
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
  
const BookBox = styled(Box)`
  width: 80px;
  border-radius: 20px;
  background: var(--white);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  `;
  
  const ContentBox = styled(Box)`
  width: 200px;
  background: var(--white);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BluetoothImg = styled.img`
  width: 20px;
  height: 26px;
`;

export default ReadingBook;