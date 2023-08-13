import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookDesc, BookStatistics, BookHistoryLog, Tab, HistoryLogEdit } from './../components/bookInfo';
import { ProgressBar } from './../components/common';
import { useRecoilValue } from 'recoil';
import { BookInfoTabAtom, LogEditAtom } from './../recoil/book/BookAtom';
import { getUserBookInfo } from '../api/userbookApi';
import { getUserBookStatistics } from './../api/statisticsApi';
import { LayoutSecond, StyleBackContainer } from './../styles/CommonStyle';
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

  const nowPage = 150;  // 추후 변경 필요 bookInfo?.nowPage
  const progress = Math.floor((nowPage / bookInfo?.page) * 100);
  const status = bookInfo?.status;

  return (
    <LayoutSecond>
    
    <StyleBackContainer>
      <BookDesc bookInfo={bookInfo} />
      <BookInfoContent>
        {bookInfo && hasHistory === 200 ? (
          <>
            <Tab />
            {selectedTab === 'statistics' ? (
              <div>
                <ProgressBar progress={progress} containerWidth={300} />
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

    </LayoutSecond>
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

const EmptyContentDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyContent = styled.div`
  text-align: center;
  line-height: 40px;
  font-size: var(--font-h4);
`;

export default BookInfoPage;