import React, { useState } from 'react';
import SearchBar from '../components/bookSearch/SearchBar';
import SearchResults from './../components/bookSearch/SearchResults';
import { styled } from 'styled-components';

const BookSearchPage = () => {
  const [bookSearchResults, setBookSearchResults] = useState([]);

  const updateSearchResults = (results) => {
    setBookSearchResults(results);
  };

  return (
    <Layout>
      <SearchBar title={'검색하여 책 등록하기'} updateSearchResults={updateSearchResults} />
      <SearchResults bookSearchResults={bookSearchResults} />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
`

export default BookSearchPage;