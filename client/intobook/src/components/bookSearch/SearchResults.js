import React, { useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import ResultBook from './ResultBook';
import { ResultsContainer } from '../../styles/bookSearch/SearchStyle';

const SearchResults = ({ bookSearchResults, isLoading }) => {
  // const resultsArray = bookSearchResults || []

  const [resultsArray, setResultsArray] = useState(bookSearchResults || []);

  useEffect(() => {
    if (!isLoading) {
      setResultsArray(prevResults => [...prevResults, ...bookSearchResults]);
    }
  }, [bookSearchResults, isLoading]);

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