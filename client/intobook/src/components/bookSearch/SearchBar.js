import React, { useEffect, useRef, useState } from 'react';
import { barcodehIcon, searchIcon } from '../../assets/img/search/searchBottomSheetImg';
import { SearchBarContainer, Title, SerchBarDiv, BarcordeIcon, Line, SearchBarInput, SearchIcon } from './../../styles/bookSearch/SearchBarStyle';
import { useSetRecoilState } from 'recoil';
import { SearchKeywordAtom } from '../../recoil/book/BookAtom';

const SearchBar = ({ title }) => {
  const [keyword, setKeyword] = useState('');
  const setSearchKeyword = useSetRecoilState(SearchKeywordAtom);
  const searchBarInputRef = useRef(null);

  const inputChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  const searchHandler = async () => {
    if (keyword.trim() !== '') {
      setSearchKeyword(keyword);
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
    <SearchBarContainer>
      <Title>{title}</Title>
      <SerchBarDiv>
        <BarcordeIcon src={barcodehIcon} alt="barcode-icon" />
        <Line />
        <SearchBarInput 
          placeholder='책 제목, 저자명, 키워드 등을 입력하세요.'
          value={keyword}
          onChange={inputChangeHandler}
          ref={searchBarInputRef}
          onKeyDown={enterKeyPressHandler}
        />
        {keyword && (
          <SearchIcon 
            onClick={searchHandler}
            src={searchIcon} 
            alt="search-icon" 
          />
        )}
      </SerchBarDiv>
    </SearchBarContainer>
  );
};

export default SearchBar;