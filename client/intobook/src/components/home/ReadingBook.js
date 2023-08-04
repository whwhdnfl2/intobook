import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { StyledEngineProvider, Container, Box, Typography } from '@mui/material';
import { styled } from 'styled-components';
import ProgressBar from './../common/progressBar';
import BookCover from './../common/bookCover';

const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 이미지 경로 (실제로는 axios 통신을 통해 받아와야됨)
  const imgUrl = "https://i.ytimg.com/vi/1ZhDsPdvl6c/maxresdefault.jpg"

  // 현재 페이지
  const nowPage = 70

  // 현재 읽고 있는 책이 있는지 여부
  const hasReadingBook = false


  const clickHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <GridContainer>
          <CurrentBook>
            {/* 현재 등록되어 있는 책이 있다면 커버 이미지 보여주기 */}
            {hasReadingBook && <BookCover image={imgUrl} />}
            {/* 현재 등록되어 있는 책이 없다면 책을 등록할 수 있는 버튼 보여주기 */}
            {!hasReadingBook && (
              <AddCircleOutlineIcon
                onClick={clickHandler}
                style={{ color: 'var(--main-green-color)', fontSize: '26px' }}
              />
            )}
          </CurrentBook>
          <CurrentBookStatus>
            {hasReadingBook && ( <Typography>천개의 파랑</Typography>) }
            {!hasReadingBook && ( <Typography>책을 등록해보세요</Typography>) }
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