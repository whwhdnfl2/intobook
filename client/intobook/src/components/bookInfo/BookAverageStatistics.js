import React from 'react';
import { styled } from 'styled-components';

const BookAverageStatistics = () => {
  return (
    <StatisticsDiv>
      <Div></Div>
      <Div></Div>
    </StatisticsDiv>
  );
};

const StatisticsDiv = styled.div`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const Div = styled.div`
width: 145px;
height: 160px;
flex-shrink: 0;
border-radius: 10px;
background: var(--main-color);
`;

export default BookAverageStatistics;