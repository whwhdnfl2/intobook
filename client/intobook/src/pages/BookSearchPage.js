import React, { useEffect, useState } from 'react';
import SearchBar from '../components/bookSearch/SearchBar';
import SearchResults from './../components/bookSearch/SearchResults';
import { Layout } from './../styles/CommonStyle';
import { searchBooks } from './../api/searchApi';
import { useRecoilValue } from 'recoil';
import { SearchKeywordAtom } from '../recoil/book/BookAtom';

const BookSearchPage = () => {
  // const [bookSearchResults, setBookSearchResults] = useState([]);
  const searchKeyword = useRecoilValue(SearchKeywordAtom);
  const [bookSearchResults, setBookSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const updateSearchResults = async (searchKeyword) => {
      // setBookSearchResults(results);
      if (!isLoading) {
        setIsLoading(true);
        const searchValues = await searchBooks(searchKeyword, page);
        setBookSearchResults(searchValues.item)
        // setBookSearchResults(prevResults => [...prevResults, searchValues.item]);
        setIsLoading(false);
      }
    };
    updateSearchResults(searchKeyword);
  }, [searchKeyword, page])


  const scrollHandler = () => {
    console.log('he', document.documentElement.scrollHeight);
    console.log('to', document.documentElement.scrollTop);
    console.log('w', window.innerHeight);

    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight - 3) {
      setPage((prev) => prev + 1);
      console.log('작동')
    }

  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
  }, []);

  return (
    <Layout>
      <SearchBar title={'검색하여 책 등록하기'} />
      <SearchResults bookSearchResults={bookSearchResults} />
    </Layout>
  );
};

export default BookSearchPage;