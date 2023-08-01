// import React from 'react';
import React, { useState } from 'react';
import { StyledEngineProvider, Container, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import SearchBottomSheet from '../components/bookSearch/SearchBottomSheet';

import SearchBottomSheet from './../bookSearch/SearchBottomSheet';
import { styled } from 'styled-components';

const ReadingBook = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(true);
  };
  return (
    <>
      <StyledEngineProvider injectFirst>
        <GridContainer>
          <BookBox>
            블루투스 통신
          </BookBox>
          <ContentBox>
            <AddCircleOutlineIcon onClick={clickHandler} />
          </ContentBox>
        </GridContainer>
      </StyledEngineProvider>
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={clickHandler} />
    </>
  );
};

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
  border: 1px solid pink;
`;

const ContentBox = styled(Box)`
  width: 200px;
  border-radius: 20px;
  border: 1px solid pink;
`;

export default ReadingBook;