import React, { useState, useEffect } from 'react';
import { BookDesc, BookStatistics, BookHistoryLog, Tab, Buttons } from './../components/bookInfo';
import { useParams } from 'react-router-dom';
import { Layout } from './../styles/CommonStyle';
import { useRecoilValue } from 'recoil';
import { BookInfoTabAtom } from './../recoil/book/BookAtom';

import { getBookDetail } from '../api/searchApi';
import { getUserBookInfo } from '../api/userbookApi';
import { styled } from 'styled-components';

const BookInfoPage = () => {
  const { bookId, userBookId } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const selectedTab = useRecoilValue(BookInfoTabAtom);

  useEffect(() => {
    const getBookInfo = async () => {
      if (bookId) {
        const bookInfo = await getBookDetail(bookId);
        setBookInfo(bookInfo);
      } else if (userBookId) {
        const bookInfo = await getUserBookInfo(userBookId);
        setBookInfo(bookInfo);
      }
    };
    getBookInfo()
  }, [bookId, userBookId]);

  return (
    <Layout>
      <BookDesc bookInfo={bookInfo} />
      <BookInfoContent>
        <Tab />
        {selectedTab === 'statistics' ? (
          <BookStatistics />
        ) : (
          <BookHistoryLog userBookId={userBookId} />
        )}
        {selectedTab === 'statistics' && <Buttons bookInfo={bookInfo} />}
      </BookInfoContent>
    </Layout>
  );
};

const BookInfoContent = styled.div`
  width: 320px;
  height: 410px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--white);
  border: 1px solid var(--main-color);
  margin-top: 12px;
  }
`;

export default BookInfoPage;