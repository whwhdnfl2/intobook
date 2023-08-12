import React, { useState, useEffect, useRef } from 'react';
import { Stack, Box } from '@mui/material';
import ResultBook from './ResultBook';
import { ResultsContainer } from '../../styles/bookSearch/SearchStyle';
import { searchBooks } from './../../api/searchApi';
import useInfiniteScroll from './../../utils/useInfiniteScroll';

const SearchResults = ({ searchKeyword }) => {
  const [bookSearchResults, setBookSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  async function getMoreBookSearchResults() {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      try {
        const searchValues = await searchBooks(searchKeyword, page);

        if (searchValues.item.length === 0) {
          setHasMore(false);
        } else {
          setBookSearchResults(prev => [...prev, ...searchValues.item]);
          setPage(prevPage => prevPage + 1);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  }

  const targetRef = useInfiniteScroll(getMoreBookSearchResults);
  
  const scrollToTop = () => {
    const container = document.getElementById('results-container');
    if (container) {
      container.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      scrollToTop();
      setIsLoading(true);
      setBookSearchResults([]);
      searchBooks(searchKeyword, 1).then(val => { 
        setBookSearchResults(val.item);
        setPage(2);
        setIsLoading(false);
        setHasMore(true);
      });
    }
  }, [searchKeyword]);

  return (
    <ResultsContainer id='results-container'>
      <Stack direction='row' flexWrap='wrap' justifyContent='start' columnGap={3.5} rowGap={1.5}>
        {bookSearchResults.map((item, idx) => (
          <Box key={idx} ref={targetRef}>
            <ResultBook bookCover={item} />
          </Box>
        ))}
        {isLoading && (
          <div style={{ height: '10px'}}>
            LOADING
          </div>
        )}
      </Stack>
    </ResultsContainer>
  );
};

export default SearchResults;
