import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchBookDetail } from '../api/searchBookDetail';

import BookDescription from './../components/bookInfo/bookDescription';
import BookHistory from './../components/bookInfo/bookHistory';

const BookInfoPage = () => {
  const { bookId } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTab, setSelectedTab] = useState('introduction'); // 'introduction' 또는 'history'로 초기화


  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const bookData = await searchBookDetail(bookId);
        setBookInfo(bookData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details.');
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [bookId]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h2>{bookInfo.title}</h2>
          <div style={{ display: 'flex' }}>
            <img src={bookInfo.coverImage} alt="Book Cover" style={{ width: '150px', marginRight: '10px' }} />
            <div>
              <p>{bookInfo.author}</p>
              <p>출판사: {bookInfo.publisher}</p>
              <p>전체 페이지: {bookInfo.page}</p>
              <p>출판일: {bookInfo.publishDate}</p>
            </div>
          </div>          
        </div>
      )}
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
          {selectedTab === 'introduction' ? (
            <BookDescription bookInfo={bookInfo} />
          ) : (
            <BookHistory bookInfo={bookInfo} />
          )}
        </div>
    </div>
  );
};

export default BookInfoPage;
