import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px'}}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress  variant="determinate" value={props.value} />
      </Box>
      <Box sx={{ minWidth: 10 }}>
      </Box>
    </Box>
  );
}

export default function ProgressBar({ now_page = 0 }) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={now_page} />
    </Box>
  );
}