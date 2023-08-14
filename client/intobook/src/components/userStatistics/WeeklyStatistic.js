import React from 'react';
import { MyResponsiveBar } from './';


const WeeklyStatistic = (weeklyData) => {
  const day = ['월', '화', '수', '목', '금', '토', '일']
  // const thisWeek = weeklyData?.thisWeek
  const lastWeek = weeklyData?.lastWeek
  
  const weeksLength = weeklyData?.weeks?.length ?? 0;
  let thisWeek = [0, 0, 0, 0, 0, 0, 0];
  if (weeksLength === 2) {
    thisWeek = weeklyData.weeks[1];
  }

  const data = [];

  if (lastWeek && thisWeek) {
    for (let i = 0; i < day.length; i++) {
      const item = {
        day: day[i],
        lastweek: lastWeek[i],
        thisweek: thisWeek[i]
      };
      data.push(item);
    };
  };


    return (
      <div style={{ height: '300px', width: '320px' }}>
        <p>나를 이겨라~~! 주간 그래프</p>
        <MyResponsiveBar data={data} />
      </div>
    );
  };

  export default WeeklyStatistic;
