import React from 'react';
import { MyResponsiveBar } from './';
import { styled } from 'styled-components';


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
      <StyledWeeklyStatistic>
        <p>지난주의 나를 이겨라!</p>
        <MyResponsiveBar data={data} />
      </StyledWeeklyStatistic>
    );
  };

  const StyledWeeklyStatistic = styled.div`
  height: 280px;
  width: 90%;
  min-width: 320px;
  background-color: rgba(235, 235, 235, 0.6);
  padding: 0.5rem 0.5rem 0;
  border-radius: 20px;
  text-align: center;
  font-size: var(--font-h6);
`;

  export default WeeklyStatistic;
