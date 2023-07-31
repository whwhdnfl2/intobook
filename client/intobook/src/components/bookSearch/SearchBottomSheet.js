import React from 'react';
import { Link } from 'react-router-dom';
import SearchGroups from './SearchGroups';
import { searchIcon, barcodehIcon, bookshIcon } from '../../assets/img/search/searchBottomSheetImg';
import { Booksearch, SearchBottomeSheetDiv, Title, TopLine, Line } from '../../styles/bookSearch/SearchBottomSheetStyle';

const SearchBottomSheet = () => {

  return (
    <Booksearch>
      <SearchBottomeSheetDiv>
      <Title>
        <span>읽을 책 등록하기</span>
      </Title>
      <TopLine />
      <Link to='/search' style={{textDecoration: 'none'}}>
        <SearchGroups iconSrc={searchIcon} methodText={'검색하여 등록하기'}></SearchGroups>
      </Link>
      <Line />
      <SearchGroups iconSrc={barcodehIcon} methodText={'바코드로 등록하기'}></SearchGroups>
      <Line />
      <SearchGroups iconSrc={bookshIcon} methodText={'내 책장에서 등록하기'}></SearchGroups>
      <Line />
      </SearchBottomeSheetDiv>
    </Booksearch>
  );
};

export default SearchBottomSheet;