import React, { useEffect, useRef, useState } from 'react';
import { barcodehIcon, searchIcon } from '../../assets/img/search/searchBottomSheetImg';
import { SearchBarContainer, Title, SerchBarDiv, BarcordeIcon, Line, SearchBarInput, SearchIcon } from './../../styles/bookSearch/SearchBarStyle';
import Barcode from './Barcode';
import SelectedBook from './SelectedBook';

const SearchBar = ({ title, updateSearchKeyword }) => {
  const [keyword, setKeyword] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scannedBook, setScannedBook] = useState(null);
  const searchBarInputRef = useRef(null);

  console.log(454545, showScanner, scannedBook, isOpen)

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
            <div>
              <BarcordeIcon src={barcodehIcon} alt="barcode-icon" onClick={barcodeScannerHandler} />
            </div>
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
      {showScanner && <Barcode setShowScanner={setShowScanner} setScannedBook={setScannedBook} setIsSheetOpen={setIsOpen} />}
      <SelectedBook isOpen={isOpen} setIsOpen={setIsOpen} selectedInfo={scannedBook} />
    </>
  );
};

export default SearchBar;