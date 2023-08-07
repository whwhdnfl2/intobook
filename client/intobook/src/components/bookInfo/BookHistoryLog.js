import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { HistoryLogsAtom } from '../../recoil/book/BookAtom';
import { Stack, Box } from '@mui/material';
import { getBookHistory } from './../../api/historyApi';
import Log from './Log';
import { styled } from 'styled-components';

const BookHistoryLog = ({ userBookId }) => {
  const [historyLogs, setHistoryLogs] = useRecoilState(HistoryLogsAtom);

  useEffect(() => {
    const getHistoryLogs = async () => {
      try {
        const res = await getBookHistory(userBookId, 0);
        setHistoryLogs(res.items);
      } catch (err) {
        console.error(err);
      }
    }; 
    getHistoryLogs()
  }, [setHistoryLogs, userBookId])
  
  return (
    <HistoryLogContainer> 
      <Stack direction='column' rowGap='10px' >
        {historyLogs && historyLogs.map((log, idx) => (
          <Box key={idx} sx={{ margin: '0 auto' }}>
            <Log log={log} />
          </Box>
        ))}
      </Stack>
    </HistoryLogContainer>
  );
};

const HistoryLogContainer = styled.div`
  width: 300px;
  height: 350px;
  margin: 0 auto;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default BookHistoryLog;