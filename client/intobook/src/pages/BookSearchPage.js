import React, { useState } from 'react';
import SearchBar from '../components/bookSearch/SearchBar';
import SearchResults from './../components/bookSearch/SearchResults';
import { Layout } from './../styles/CommonStyle';

const BookSearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const updateSearchKeyword = (keyword) => {
    setSearchKeyword(keyword)
  }
  
  return (
    <Layout>
      <SearchBar title={'검색하여 책 등록하기'} updateSearchKeyword={updateSearchKeyword} />
      <SearchResults searchKeyword={searchKeyword} />
    </Layout>
  );
};

export default BookSearchPage;