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
  height: 180px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--white);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 15px auto 15px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Div = styled.div`
width: 120px;
height: 150px;
flex-shrink: 0;
border-radius: 10px;
background: var(--main-color);
`;

export default BookAverageStatistics;