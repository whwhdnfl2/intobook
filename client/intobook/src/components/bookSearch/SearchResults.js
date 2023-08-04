import React from 'react';
import { Stack, Box } from '@mui/material';
import ResultBook from './ResultBook';
import { ResultsContainer } from '../../styles/bookSearch/SearchStyle';

const SearchResults = ({ bookSearchResults }) => {
  const resultsArray = bookSearchResults || []

  return (
    <ResultsContainer>
      <Stack direction='row' flexWrap='wrap' justifyContent='start' columnGap={3.5} rowGap={1.5}>
        {resultsArray.map((item, idx) => (
          <Box key={idx}>
            <ResultBook bookCover={item} />
          </Box>
        ))}
      </Stack>    
    </ResultsContainer> 
  );
};

export default SearchResults;