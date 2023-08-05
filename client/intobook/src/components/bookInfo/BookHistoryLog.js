import React, { useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { getBookHistory } from './../../api/historyApi';
import Log from './Log';

const BookHistoryLog = ({ userBookId }) => {
  const [historyLogs, setHistoryLogs] = useState([]);


  useEffect(() => {
    const getHistoryLogs = async () => {
      const res = await getBookHistory(userBookId, 0); 
      setHistoryLogs(res.items);
    }; 
    getHistoryLogs()
  }, [userBookId])
  
  return (
    <div> 
      <Stack direction='column' rowGap='10px' >
        {historyLogs && historyLogs.map((log, idx) => (
          <Box key={idx} sx={{ margin: '0 auto' }}>
            <Log log={log} />
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default BookHistoryLog;