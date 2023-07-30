import React, { useEffect, useRef, useState } from 'react';
import { barcodehIcon, searchIcon } from '../../assets/img/search/searchBottomSheetImg';
import { Title, SerchBarDiv, BarcordeIcon, Line, SearchBarInput, SearchIcon } from './../../styles/bookSearch/SearchBarStyle';


const SearchBar = ({title}) => {
  const [searchValue, setSearchValue] = useState('');
  const searchBarInputRef = useRef(null);

  const inputChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => { // 검색 페이지로 이동시 input창에 자동 포커스
    searchBarInputRef.current.focus();
  }, []);

  return (
    <div>
      <Title>{title}</Title>
      <SerchBarDiv>
        <BarcordeIcon src={barcodehIcon} alt="barcode-icon" />
        <Line />
        <SearchBarInput 
          placeholder='책 제목, 저자명, 키워드 등을 입력하세요.'
          value={searchValue}
          onChange={inputChangeHandler}
          ref={searchBarInputRef}
        />
        {searchValue && <SearchIcon src={searchIcon} alt="search-icon" />}
      </SerchBarDiv>
    </div>
  );
};

export default SearchBar;