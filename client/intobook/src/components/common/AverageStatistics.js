import React from 'react';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import { formatTime } from './../../utils/dateTimeUtils';
import { styled } from 'styled-components';

const AverageStatistics = ({ readingTime, readSpeed }) => {
  const avgReadingTime = formatTime(readingTime);

  return (
    <StatisticsDiv>
      <Div>
        <IconDiv>
          <AccessAlarmsOutlinedIcon sx={{ marginLeft: '2px', width: '26px', height: '26px', color: '#5061FF' }} />
        </IconDiv>
        <Title>책에 푹 빠져든 시간</Title>
        <Content>{avgReadingTime}</Content>
      </Div>
      <Div>
        <IconDiv>
          <SpeedOutlinedIcon sx={{ width: '26px', height: '26px', color: '#5061FF' }} />
        </IconDiv>
        <Title>책에 푹 빠져든 속도</Title>
        <Content>{readSpeed}p/1h</Content>
      </Div>
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
  background: #5061FF;
`;

const IconDiv = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #CACFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px auto  20px auto;
`;

const Title = styled.div`
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: 14px;
  margin: 7px;
`;

const Content = styled.div`
  color: var(--white);
  text-align: center;
  font-family: Open Sans;
  font-size: var(--font-h4);
  font-weight: 600;
`;

export default AverageStatistics;