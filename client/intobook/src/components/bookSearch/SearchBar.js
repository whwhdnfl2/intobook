import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { barcodehIcon, searchIcon } from '../../assets/img/search/searchBottomSheetImg';
import { SearchBarContainer, Title, SerchBarDiv, BarcordeIcon, Line, SearchBarInput, SearchIcon } from './../../styles/bookSearch/SearchBarStyle';
import Barcode from './Barcode';

const SearchBar = ({ title, updateSearchKeyword }) => {
  const [keyword, setKeyword] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const searchBarInputRef = useRef(null);

  const inputChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  const searchHandler = async () => {
    if (keyword.trim() !== '') {
      setKeyword(keyword);
      updateSearchKeyword(keyword)
    }
  };

  const enterKeyPressHandler = (event) => { // Enter키로도 검색 가능
    if (event.key === 'Enter') {
      searchHandler();
    }
  };

  useEffect(() => { // 검색 페이지로 이동시 input창에 자동 포커스
    const setFocus = () => {
      searchBarInputRef.current.focus();
      window.scrollTo(0, 0); // 스크롤 위치 조정
    };

    setFocus();
  }, []);

  const barcodeScannerHandler = () => {
    setShowScanner(true);
  };

  return (
    <>
      {!showScanner &&
        <SearchBarContainer>
          <Title>{title}</Title>
          <SerchBarDiv>
            {/* <BarcordeIcon onClick={barcodeScannerHandler} src={barcodehIcon} alt="barcode-icon" /> */}
            <Link to='/search/barcode' style={{ textDecoration: 'none' }}>
              <BarcordeIcon  src={barcodehIcon} alt="barcode-icon" />
            </Link>
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
      }

      {showScanner && <Barcode />}
    </>
  );
};

export default SearchBar;