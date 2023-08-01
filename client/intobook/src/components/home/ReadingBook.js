import React from 'react';
import { StyledEngineProvider, Container, Grid, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from 'styled-components';

const ReadingBook = () => {
  return (
    <StyledEngineProvider injectFirst>
      <GridContainer>
        <BookBox>
          블루투스 통신
        </BookBox>
        <ContentBox>
          <AddCircleOutlineIcon />
        </ContentBox>
      </GridContainer>
    </StyledEngineProvider>
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