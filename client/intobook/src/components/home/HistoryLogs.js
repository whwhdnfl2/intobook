import React from 'react';
import { StyledEngineProvider, Stack, Box, Typography } from '@mui/material';
import { styled } from 'styled-components';

const HistoryLogs = () => {
  //nickname 값 받아오기
  const nickname = '북빠';

  return (
    <StyledEngineProvider injectFirst>
      <HistoryTitle>{nickname}'s Daily Log</HistoryTitle>
      <HistoryStack>
        <Box>
          Daily log 부분 
        </Box>
      </HistoryStack>
    </StyledEngineProvider>
  );
};

const HistoryTitle  = styled(Typography)`
  font-family: var(--main-font);
  color: var(--main-green-color);
  margin-left: 10px;
`;

const HistoryStack = styled(Stack)`
  width: 300px;
  height: 89px;
  direction: row;  
  flex-wrap: wrap;
  justify-content: start;
  columnGap: 3.5;
  rowGap: 1.5;
  border: 1px solid black;
  margin: 10px auto 20px auto;
`;


export default HistoryLogs;