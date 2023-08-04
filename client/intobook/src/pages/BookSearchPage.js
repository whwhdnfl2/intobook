import React, { useState } from 'react';
import SearchBar from '../components/bookSearch/SearchBar';
import SearchResults from './../components/bookSearch/SearchResults';
import { Layout } from './../styles/CommonStyle';

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

export default BookSearchPage;