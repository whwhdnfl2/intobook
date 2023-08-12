import React, { useState, useEffect, useRef } from 'react';
import { Stack, Box } from '@mui/material';
import ResultBook from './ResultBook';
import { ResultsContainer } from '../../styles/bookSearch/SearchStyle';
import { useRecoilValue } from 'recoil';
import { SearchKeywordAtom } from './../../recoil/book/BookAtom';
import { searchBooks } from './../../api/searchApi';
import { StyleContainer } from '../../styles/CommonStyle';

const SearchResults = () => {
  const searchKeyword = useRecoilValue(SearchKeywordAtom);

  const [bookSearchResults, setBookSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const elementRef = useRef(null);

  async function getMoreBookSearchResults() {
    setIsLoading(true);
  
    try {
      const searchValues = await searchBooks(searchKeyword, page);
      console.log('api 요청', searchValues);
      
      if (searchValues.item.length === 0) {
        console.log('데이터 없어', searchValues.item.length);
        setHasMore(false);
      } else {
        console.log('데이터 있어', searchValues.item);
        setBookSearchResults(prev => [...prev, ...searchValues.item]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  
  function onIntersection (entries) {
    console.log('들어왔?')
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasMore && !isLoading) {
      getMoreBookSearchResults();
    }
  }

  useEffect(() => {
    setPage(1);
    setBookSearchResults([]);
    setIsLoading(false);
    setHasMore(true);
  }, [searchKeyword]);


  useEffect(() => {
    console.log(searchKeyword, 111)
    const observer = new IntersectionObserver(onIntersection)
    console.log('observer', observer)
    console.log(222, elementRef.current)
    console.log(333, elementRef)
    if (observer && elementRef.current) {
      console.log('여기는?')
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [bookSearchResults, isLoading]);

  return (
      <ResultsContainer id='results-container'>
      <Stack direction='row' flexWrap='wrap' justifyContent='center' columnGap={3.5} rowGap={1.5}>
        {bookSearchResults.map((item, idx) => (
          <Box key={idx} ref={((idx + 1) % 10 === 0) ? elementRef : null}>
            <ResultBook bookCover={item} />
          </Box>
        ))}
      </Stack>
      {hasMore && <div ref={elementRef} style={{ height: '10px' }}> 로딩 중</div>}
    </ResultsContainer>
    
  );
};

export default SearchResults;