import React from 'react';
import { MyResponsiveBar } from './';

const WeeklyStatistic = (weeklyData) => {

  const thisWeek = weeklyData?.weeklyData?.[0]
  console.log(thisWeek)
  // const lastWeek = weeklyData?.weeklyData?.[1]

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
      냠냠..
    </div>
  );
};

export default WeeklyStatistic;
