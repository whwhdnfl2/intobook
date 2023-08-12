import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { HistoryLogsAtom } from '../../recoil/book/BookAtom';
import { Stack, Box } from '@mui/material';
import { getBookHistory } from './../../api/historyApi';
import Log from './Log';
import { styled } from 'styled-components';
import useInfiniteScroll from '../../utils/useInfiniteScroll';

const BookHistoryLog = ({ userBookId }) => {
  const [historyLogs, setHistoryLogs] = useRecoilState(HistoryLogsAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  async function getBookHistoryLogs() {
    setIsLoading(true);
    try {
      const res = await getBookHistory(userBookId, page);

      if (res.items.length === 0) {
        setHasMore(false);
      } else {
        setHistoryLogs((prev) => [...prev, ...res.items]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const targetRef = useInfiniteScroll(getBookHistoryLogs);

  return (
    <HistoryLogContainer>
      <Stack direction='column' rowGap='10px' >
        {historyLogs && historyLogs.map((log, idx) => (
          <Box key={idx} sx={{ margin: '0 auto' }}>
            <Log log={log} />
          </Box>
        ))}
        {hasMore && !isLoading && (<div ref={targetRef} >로딩중</div>)}
      </Stack>
    </HistoryLogContainer>
  );
};

const HistoryLogContainer = styled.div`
  width: 300px;
  height: 350px;
  margin: 10px auto;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default BookHistoryLog;