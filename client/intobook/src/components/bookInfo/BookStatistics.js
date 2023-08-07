import React from 'react';
import { ProgressBar } from '../common';

const BookStatistics = () => {
  // 이후에 값 받아오기
  const progress = 20

  

  return (
    <div style={{ textAlign: 'center' }}>
      <ProgressBar progress={progress} containerWidth={300} />
    </div>
  );
};

export default BookStatistics;