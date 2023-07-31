import React from 'react';
import { Stack, Box } from '@mui/material';
import BookCover from './BookCover';

const SearchResults = ({ bookSearchResults }) => {
  const resultsArray = bookSearchResults || []

  return (
      <Stack direction='row' flexWrap='wrap'
      justifyContent='start' gar={2}>
        {resultsArray.map((item, idx) => (
          <Box key={idx}>
            <BookCover bookCover={item} />
          </Box>
        ))};

      </Stack>    
  );
};

export default SearchResults;