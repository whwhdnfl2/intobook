import React, { useEffect, useRef, useState } from 'react';
import { barcodehIcon, searchIcon } from '../../assets/img/search/searchBottomSheetImg';
import { Title, SerchBarDiv, BarcordeIcon, Line, SearchBarInput, SearchIcon } from './../../styles/bookSearch/SearchBarStyle';
import { searchBooks } from './../../api/searchApi';


const SearchBar = ({title}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const searchBarInputRef = useRef(null);

  const inputChangeHandler = (event) => {
    setSearchKeyword(event.target.value);
  };

  const searchHandler = async () => {
    if (searchKeyword.trim() !== '') {
      // 검색 api 호출
      const searchValues = await searchBooks(searchKeyword, 0);
      console.log('결과결과', searchValues)
    }
  };

  const enterKeyPressHandler = (event) => { // Enter키로도 검색 가능
    if (event.key === 'Enter') {
      searchHandler();
    }
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
          value={searchKeyword}
          onChange={inputChangeHandler}
          ref={searchBarInputRef}
          onKeyDown={enterKeyPressHandler}
        />
        {searchKeyword && (
          <SearchIcon 
            onClick={searchHandler}
            src={searchIcon} 
            alt="search-icon" 
          />
        )}
      </SerchBarDiv>
    </div>
  );
};

export default SearchBar;