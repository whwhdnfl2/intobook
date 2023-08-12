import React from 'react';
import SearchBar from '../components/bookSearch/SearchBar';
import SearchResults from './../components/bookSearch/SearchResults';
import { Layout } from './../styles/CommonStyle';

const BookSearchPage = () => {
  
  return (
    <Layout>
      <SearchBar title={'검색하여 책 등록하기'} />
      <SearchResults />
    </Layout>
  );
};

export default BookSearchPage;