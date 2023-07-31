import React from 'react';
import { useParams } from 'react-router-dom';


const BookInfoPage = () => {
  const { bookId } = useParams();

  return (
    <div>
      책 정보 페이지입니다-!
      <p>ISBN: {bookId}</p>
      {/* 추후 `/books/${bookId}` 으로 API 통신 요청 후 데이터 받아오기*/}
    </div>
  );
};

export default BookInfoPage;