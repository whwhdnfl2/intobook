import React, { useEffect, useState } from 'react';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import { formatTime } from './../../utils/dateTimeUtils';
import { styled, keyframes } from 'styled-components';
import { faL } from '@fortawesome/free-solid-svg-icons';

const AverageStatistics = ({ readingTime, readSpeed }) => {
  // const avgReadingTime = formatTime(readingTime) ? formatTime(readingTime) : '0분';
  const hour = parseInt(readingTime / 60)
  readingTime %= 60
  const minute = readingTime
  const [currentHour, setCurrentHour] = useState(0);
  const [currentMin, setCurrentMin] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  let hourFlag = (hour === 0 ? true:false);
  let minFlag = (minute === 0 ? true:false);
  let speedFlag = (readSpeed === 0 ? true:false)
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentHour < hour) {
        setCurrentHour(currentHour + 1);
      } else {
        hourFlag = true;
      }
      if (hourFlag && currentMin < minute) {
        setCurrentMin(currentMin + 1)
      }else {
        clearInterval(interval);
      }
    }, parseInt(1000/readingTime));
    return () => {
      clearInterval(interval);
    };
    }, [currentHour, currentMin, readingTime]);


  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSpeed < readSpeed) {
        setCurrentSpeed(currentSpeed + 1);
      }else {
        clearInterval(interval);
      }
    }, parseInt(1000/readSpeed));
    return () => {
      clearInterval(interval);
    };
  }, [currentSpeed, readSpeed]);


  return (
    <StatisticsDiv>
      <Div>
        <IconDiv>
          <AccessAlarmsOutlinedIcon sx={{ marginLeft: '2px', width: '26px', height: '26px', color: '#5061FF' }} />
        </IconDiv>
        <Title>책에 푹 빠져든 시간</Title>
        {/* <Content>{avgReadingTime}</Content> */}
        <Content>{currentHour}시간 {currentMin}분</Content>
      </Div>
      <Div>
        <IconDiv>
          <SpeedOutlinedIcon sx={{ width: '26px', height: '26px', color: '#5061FF' }} />
        </IconDiv>
        <Title>책에 푹 빠져든 속도</Title>
        <Content>{currentSpeed}p/hour</Content>
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
  // background: #5061FF;
  background-color: rgba(80, 97, 255, 0.6);
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

const CountUpAnimation = keyframes`
  from {
    content: "0";
  }
  to {
    content: attr(data-count);
  }
`;

const CounterWrapper = styled.div`
  font-size: 15px;
  font-weight: bold;
  animation: ${CountUpAnimation} 5s linear forwards;
`;

export default AverageStatistics;