import React from 'react';
import { ProgressBar } from '../common';
import BookTotalStatistics from './BookTotalStatistics';
import BookAverageStatistics from './BookAverageStatistics';

const BookStatistics = () => {
  // 이후에 값 받아오기
  const progress = 20

  return (
    <div>
      <ProgressBar progress={progress} containerWidth={300} />
      <BookTotalStatistics />
      <BookAverageStatistics />
    </div>
  );
};

export default BookStatistics;