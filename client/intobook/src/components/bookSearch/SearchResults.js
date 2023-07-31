import React from 'react';
import { Stack, Box } from '@mui/material';
import ResultBook from './ResultBook';

const SearchResults = ({ bookSearchResults }) => {
  const resultsArray = bookSearchResults || []

  return (
      <Stack direction='row' flexWrap='wrap' justifyContent='start' gap={3.5} >
        {resultsArray.map((item, idx) => (
          <Box key={idx} mb={2}>
            <ResultBook bookCover={item} />
          </Box>
        ))}
      </Stack>    
  );
};

export default SearchResults;