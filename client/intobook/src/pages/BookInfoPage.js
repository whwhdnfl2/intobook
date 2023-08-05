import React from 'react';
import { BookDesc, BookStatistics, BookHistoryLog, Tab } from './../components/bookInfo';
import { useParams } from 'react-router-dom';
import { Layout } from './../styles/CommonStyle';
import { useRecoilValue } from 'recoil';
import { BookInfoTabAtom } from './../recoil/book/BookAtom';
import { addUserBook } from '../api/userbookApi';

const BookInfoPage = () => {
  const { bookId } = useParams();
  const selectedTab = useRecoilValue(BookInfoTabAtom);

  const registerBookHandler = async () => {
    const res = await addUserBook(bookId);

    if (res === 'success') {
      // home으로 이동하기
    }
  };

  return (
    <Layout>
      <BookDesc bookId={bookId} />
      <Tab />
      {selectedTab === 'statistics' ? (
        // <BookStatistics bookInfo={bookInfo} />
        <BookStatistics />
      ) : (
        <BookHistoryLog />
      )}
      <button onClick={registerBookHandler} >지금 읽을래요!</button>
    </Layout>
  );
};

export default BookInfoPage;
