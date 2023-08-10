import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookDesc, BookStatistics, BookHistoryLog, Tab, HistoryLogEdit } from './../components/bookInfo';
import { ProgressBar } from './../components/common';
import { useRecoilValue } from 'recoil';
import { BookInfoTabAtom, LogEditAtom } from './../recoil/book/BookAtom';
import { getUserBookInfo } from '../api/userbookApi';
import { Layout } from './../styles/CommonStyle';
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

  const nowPage = 150;  // 추후 변경 필요 bookInfo?.nowPage
  const progress = Math.floor((nowPage / bookInfo?.page) * 100);
  const status = bookInfo?.status;

  return (
    <Layout>
      <BookDesc bookInfo={bookInfo} />
      <BookInfoContent>
        <Tab />
        {selectedTab === 'statistics' ? (
          <div>
            <ProgressBar progress={progress} containerWidth={300} />
            <BookStatistics userBookId={userBookId} status={status} />
          </div>
          
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