import React, { useState } from 'react';
import SearchBar from '../components/bookSearch/SearchBar';
import SearchResults from './../components/bookSearch/SearchResults';
import { LayoutSecond, StyleContainer } from './../styles/CommonStyle';

const BookSearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  // const [openBarcodeModal, setOpenBarcodeModal] = useState('');

  const updateSearchKeyword = (keyword) => {
    setSearchKeyword(keyword)
  } 
  
  return (
    <LayoutSecond>
      <StyleContainer>
        <SearchBar title={'검색하여 책 등록하기'} updateSearchKeyword={updateSearchKeyword} />
        <SearchResults searchKeyword={searchKeyword} />
      </StyleContainer>
    </LayoutSecond>
  );
};

export default BookSearchPage;