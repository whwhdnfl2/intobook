import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookDetail } from '../api/searchApi';

import BookHistory from './../components/bookInfo/bookHistory';
import BookDesc from '../components/bookInfo/BookDesc';
import { Layout } from './../styles/CommonStyle';

const BookInfoPage = () => {
  const { bookId } = useParams();
  const [selectedTab, setSelectedTab] = useState('introduction'); // 'introduction' 또는 'history'로 초기화

  return (
    <Layout>
      <BookDesc bookId={bookId} />
      <div>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
            <span
              onClick={() => setSelectedTab('introduction')}
              style={{
                marginRight: '10px',
                cursor: 'pointer',
                textDecoration: selectedTab === 'introduction' ? 'underline' : 'none'
              }}
            >
              책 소개
            </span>
            <span
              onClick={() => setSelectedTab('history')}
              style={{
                cursor: 'pointer',
                textDecoration: selectedTab === 'history' ? 'underline' : 'none'
              }}
            >
              북 히스토리
            </span>
          </div>
          {/* {selectedTab === 'introduction' ? (
            <BookDescription bookInfo={bookInfo} />
          ) : (
            <BookHistory bookInfo={bookInfo} />
          )} */}
        </div>
    </Layout>
  );
};

export default BookInfoPage;
