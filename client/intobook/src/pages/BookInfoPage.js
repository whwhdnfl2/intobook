import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookDesc, BookStatistics, BookHistoryLog, Tab, HistoryLogEdit } from './../components/bookInfo';
import { ProgressBar } from './../components/common';
import { useRecoilValue } from 'recoil';
import { BookInfoTabAtom, LogEditAtom } from './../recoil/book/BookAtom';
import { getUserBookInfo } from '../api/userbookApi';
import { getUserBookStatistics } from './../api/statisticsApi';
import { Layout, StyleBackContainer, EmptySpace } from './../styles/CommonStyle';
import { styled } from 'styled-components';

const BookInfoPage = () => {
  const { userBookId } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [hasHistory, setHasHistory] = useState(204);
  const selectedTab = useRecoilValue(BookInfoTabAtom);
  const isOpenLogEdit = useRecoilValue(LogEditAtom);

  useEffect(() => {
    const getBookInfo = async () => {
      const bookInfo = await getUserBookInfo(userBookId);
      setBookInfo(bookInfo);
    };

    const getHistoryStatus = async () => {
      const res = await getUserBookStatistics(userBookId);
      setHasHistory(res.status);
    };
    getBookInfo();
    getHistoryStatus();
  }, [userBookId]);

  const nowPage = bookInfo?.nowPage ;
  const progress = bookInfo?.progress;
  const status = bookInfo?.status;

  return (
    <Layout>
      <StyleBackContainer>
        <BookDesc bookInfo={bookInfo} />
        <BookInfoContent>
          {bookInfo && hasHistory === 200 ? (
            <>
            <EmptySpace />
              <Tab />
              <EmptySpace />
              {selectedTab === 'statistics' ? (
                <div>
                  <ProgressBar progress={progress} containerWidth={300} />
                  <EmptySpace />
                  <BookStatistics userBookId={userBookId} status={status} />
                </div>
              ) : (
                isOpenLogEdit ? <HistoryLogEdit /> : <BookHistoryLog userBookId={userBookId} />
              )}
            </>
          ) : (
            <EmptyContentDiv>
              <EmptyContent>
                아직 히스토리가 없네요<br />
                책을 읽어볼까요?
              </EmptyContent>
            </EmptyContentDiv>
          )}
        </BookInfoContent>
      </StyleBackContainer>
    </Layout>
  );
};

const BookInfoContent = styled.div`
  width: 90%;
  // height: fit-content;
  height: 475px;
  flex-shrink: 0;
  border-radius: 20px;
  padding: 1rem auto;
  margin-bottom: 20px;  
`;

const EmptyContentDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyContent = styled.div`
  text-align: center;
  line-height: 40px;
  font-size: var(--font-h4);
  padding-bottom: 100px;
`;

export default BookInfoPage;