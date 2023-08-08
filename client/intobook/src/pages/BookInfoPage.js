import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookDesc, BookStatistics, BookHistoryLog, Tab, HistoryLogEdit } from './../components/bookInfo';
import { Layout } from './../styles/CommonStyle';
import { useRecoilValue } from 'recoil';
import { BookInfoTabAtom, LogEditAtom } from './../recoil/book/BookAtom';
import { getUserBookInfo } from '../api/userbookApi';
import { styled } from 'styled-components';

const BookInfoPage = () => {
  const { userBookId } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const selectedTab = useRecoilValue(BookInfoTabAtom);
  const isOpenLogEdit = useRecoilValue(LogEditAtom);

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
      <BookInfoContent>
        <Tab />
        {selectedTab === 'statistics' ? (
          <BookStatistics />
        ) : (
          isOpenLogEdit ? <HistoryLogEdit /> : <BookHistoryLog userBookId={userBookId} />
        )}
      </BookInfoContent>
    </Layout>
  );
};

const BookInfoContent = styled.div`
  width: 320px;
  height: 400px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--white);
  border: 1px solid var(--main-color);
  padding-top: 10px;
  margin-top: 10px;
`;

export default BookInfoPage;