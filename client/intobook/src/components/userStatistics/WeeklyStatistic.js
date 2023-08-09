import React from 'react';

const WeeklyStatistic = () => {
  const lastWeek = [1, 2, 3, 4, 5, 6, 7];
  const thisWeek = [5, 4, 3, 2, 1, 7, 0];

  const xAxisLabels = ['월', '화', '수', '목', '금', '토', '일'];

  const seriesData = [
    { data: lastWeek, name: '저번주', color: 'skyblue'},
    { data: thisWeek, name: '이번주', color: 'yellowgreen' },
  ];

  return (
    <div>
      외않되
    </div>
  );
};

export default WeeklyStatistic;
