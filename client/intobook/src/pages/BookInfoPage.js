import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookDesc, BookStatistics, BookHistoryLog, Tab, Buttons } from './../components/bookInfo';
import { Layout } from './../styles/CommonStyle';
import { useRecoilValue } from 'recoil';
import { BookInfoTabAtom } from './../recoil/book/BookAtom';
import { getUserBookInfo } from '../api/userbookApi';
import { styled } from 'styled-components';

const BookInfoPage = () => {
  const { userBookId } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const selectedTab = useRecoilValue(BookInfoTabAtom);

  useEffect(() => {
    const getBookInfo = async () => {
      const bookInfo = await getUserBookInfo(userBookId);
      setBookInfo(bookInfo);
    };
    getBookInfo()
  }, [userBookId]);

  return (
    <Layout>
      <BookDesc bookInfo={bookInfo} />
        <Tab />
      <BookInfoContent>
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
  height: 380px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--white);
  border: 1px solid var(--main-color);
  padding-top: 10px;
`;

export default BookInfoPage;