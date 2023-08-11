
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/bookSearch/SearchBar';
import SearchResults from './../components/bookSearch/SearchResults';
import { searchBooks } from './../api/searchApi';
import { Layout } from './../styles/CommonStyle';
import { useRecoilValue } from 'recoil';
import { SearchKeywordAtom } from '../recoil/book/BookAtom';

const BookSearchPage = () => {
  const searchKeyword = useRecoilValue(SearchKeywordAtom);

  const [bookSearchResults, setBookSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalValue, setTotalValue] = useState(24);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBookSearchResults([]);
    setPage(1);
  }, [searchKeyword]);

  useEffect( () => {
    searchBooks(searchKeyword, page)
    .then(searchValues => {
      console.log('api 요청', searchValues);
      if (searchValues.totalResults !== totalValue) {
        setTotalValue(searchValues.totalResults);
      }
      setBookSearchResults(prevResults => [...prevResults, ...searchValues.item]);
      setLoading(false);
    })
    .catch(error => {
      console.error('API 요청 중 오류 발생:', error);
    });
  }, [searchKeyword, page, totalValue])

  const totalPages = Math.ceil(totalValue / 12);

  const scrollHandler = () => {
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer.scrollHeight - (resultsContainer.scrollTop + resultsContainer.clientHeight + 1) < 200) {
      setLoading(true);
      if (page < totalPages) {
        setPage(prev => prev + 1);
      } 
    }
  };

  useEffect(() => {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.addEventListener('scroll', scrollHandler);
    
    return () => {
      resultsContainer.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  
  return (
    <Layout>
      <SearchBar title={'검색하여 책 등록하기'} />
      <SearchResults bookSearchResults={bookSearchResults} />
    </Layout>
  );
};

export default BookSearchPage;