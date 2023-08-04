import React from 'react';
import { BookDesc, BookStatistics, BookHistory, Tab } from './../components/bookInfo';
import { useParams } from 'react-router-dom';
import { Layout } from './../styles/CommonStyle';
import { useRecoilValue } from 'recoil';
import { BookInfoTabAtom } from './../recoil/book/BookAtom';

const BookInfoPage = () => {
  const { bookId } = useParams();
  const selectedTab = useRecoilValue(BookInfoTabAtom);

  return (
    <Layout>
      <BookDesc bookId={bookId} />
      <Tab />
      {selectedTab === 'statistics' ? (
        // <BookStatistics bookInfo={bookInfo} />
        <BookStatistics />
      ) : (
        <BookHistory />
      )}
    </Layout>
  );
};

export default BookInfoPage;
