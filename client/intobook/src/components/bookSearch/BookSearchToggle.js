import React from 'react';
import SearchGroups from './SearchGroups';
import { searchIcon, barcodehIcon, bookshIcon } from './../../assets/img/search/searchToggle';
import { Booksearch, BookSearchToggleDiv, Title, TopLine, Line } from '../../styles/BookSearchStyle';

const BookSearchToggle = () => {


  return (
    <Booksearch>
      <BookSearchToggleDiv>
      <Title>
        <span>읽을 책 등록하기</span>
      </Title>
      <TopLine />
      <SearchGroups iconSrc={searchIcon} methodText={'검색하여 등록하기'}></SearchGroups>
      <Line />
      <SearchGroups iconSrc={barcodehIcon} methodText={'바코드로 등록하기'}></SearchGroups>
      <Line />
      <SearchGroups iconSrc={bookshIcon} methodText={'내 책장에서 등록하기'}></SearchGroups>
      <Line />
      </BookSearchToggleDiv>
    </Booksearch>
  );
};

export default BookSearchToggle;