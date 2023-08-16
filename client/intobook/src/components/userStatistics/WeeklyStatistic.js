import React from 'react';
import { MyResponsiveBar } from './';


const WeeklyStatistic = (weeklyData) => {
  const day = ['월', '화', '수', '목', '금', '토', '일']
  const lastWeek = weeklyData?.lastWeek
  const thisWeek = weeklyData?.thisWeek
  const data = [];

  if (lastWeek && thisWeek) {
    for (let i = 0; i < day.length; i++) {
      const item = {
        day: day[i],
        지난주: lastWeek[i],
        이번주: thisWeek[i]
      };
      data.push(item);
    };
  };


    return (
      <div style={{ height: '250px', width: '90%', minWidth: '320px', backgroundColor: 'lightblue', padding: '0.5rem', borderRadius: '20px' }}>
        <p>지난주의 나를 이겨라!</p>
        <MyResponsiveBar data={data} />
      </div>
    );
  };

  export default WeeklyStatistic;
