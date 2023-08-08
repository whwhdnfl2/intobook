import React from 'react';
import { ProgressBar } from '../common';
import BookTotalStatistics from './BookTotalStatistics';
import AverageStatistics from '../common/AverageStatistics';

const BookStatistics = () => {
  // 이후에 값 받아오기
  const progress = 20

  // API 통신으로 readingTime, readSpeed 값 받아서 props로 넘겨주기

  return (
    <div>
      <ProgressBar progress={progress} containerWidth={300} />
      <BookTotalStatistics />
      <AverageStatistics readingTime={'23'} readSpeed={'31'} />
    </div>
  );
};

export default BookStatistics;