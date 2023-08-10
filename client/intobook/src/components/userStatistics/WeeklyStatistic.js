import React from 'react';
import { MyResponsiveBar } from './';


const WeeklyStatistic = () => {
  // const lastWeek = [1, 2, 3, 4, 5, 6, 7];
  // const thisWeek = [5, 4, 3, 2, 1, 7, 0];

  // const xAxisLabels = ['월', '화', '수', '목', '금', '토', '일'];

  // const seriesData = [
  //   { data: lastWeek, name: '저번주', color: 'skyblue'},
  //   { data: thisWeek, name: '이번주', color: 'yellowgreen' },
  // ];
  const data = [
    { day: '월', lastweek: 800, thisweek: 30 },
    { day: '화', lastweek: 520, thisweek: 20 },
    { day: '수', lastweek: 33, thisweek: 20 },
    { day: '목', lastweek: 520, thisweek: 100 },
    { day: '금', lastweek: 4, thisweek: 24 },
    { day: '토', lastweek: 10, thisweek: 55 },
    { day: '일', lastweek: 520, thisweek: 10 }
  ];
  

  return (
    <div style={{height: '300px', width:'320px'}}>
      <MyResponsiveBar data={data} />
    </div>
  );
};

export default WeeklyStatistic;
