import React from 'react';

const WeeklyStatistic = () => {
  const lastWeek = [1, 2, 3, 4, 5, 6, 7];
  const thisWeek = [5, 4, 3, 2, 1, 7, 0];

  const xAxisLabels = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];

  const seriesData = [
    { data: lastWeek, name: 'Last Week', color: 'skyblue'},
    { data: thisWeek, name: 'This Week', color: 'yellowgreen' },
  ];

  return (
    <div>
      외않되
    </div>
  );
};

export default WeeklyStatistic;
