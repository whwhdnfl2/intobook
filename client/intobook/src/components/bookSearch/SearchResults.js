import React, { useState, useEffect, useRef } from 'react';
import { Stack, Box } from '@mui/material';
import ResultBook from './ResultBook';
import { ResultsContainer } from '../../styles/bookSearch/SearchStyle';
import { searchBooks } from './../../api/searchApi';

const SearchResults = ({ searchKeyword }) => {
  const [bookSearchResults, setBookSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  const elementRef = useRef(null);

  const scrollToTop = () => {
    const container = document.getElementById('results-container');
    if (container) {
      container.scrollTop = 0;
    }
  };

  async function getMoreBookSearchResults() {
    setIsLoading(true);
  
    try {
      setIsLoading(true);
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
  
  function onIntersection (entries) {
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasMore) {
      getMoreBookSearchResults();
    }
  }

  useEffect(() => {
    if (searchKeyword){
      scrollToTop();
      setIsLoading(true);
      setBookSearchResults([]);
      searchBooks(searchKeyword, 1)
      .then(val => { 
        setBookSearchResults(val.item)
        setPage(2);
        setIsLoading(false);
        setHasMore(true);
      })
      
    }
  }, [searchKeyword]);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection)
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [bookSearchResults]);

  return (
    <ResultsContainer id='results-container'>
      <Stack direction='row' flexWrap='wrap' justifyContent='start' columnGap={3.5} rowGap={1.5}>
        {bookSearchResults.map((item, idx) => (
          <Box key={idx} ref={((idx + 1) % 6 === 0) ? elementRef : null}>
            <ResultBook bookCover={item} isLoading={isLoading} />
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