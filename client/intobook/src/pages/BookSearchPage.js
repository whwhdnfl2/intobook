import React from 'react';
import SearchBar from '../components/bookSearch/SearchBar';
import { styled } from 'styled-components';

const BookSearchPage = () => {
  return (
    <Layout>
      <SearchBar title={'검색하여 책 등록하기'} />
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