import React from 'react';
import TotalStatisticsItem from './../common/TotalStatisticsItem';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { formatDate, formatTime } from './../../utils/dateTimeUtils';
import { styled } from 'styled-components';

const BookTotalStatistics = ({ val, status }) => {
  const startDate = formatDate(val?.startedAt, 'dateDot');
  const completeDate = formatDate(val?.completedAt, 'dateDot');
  const readingTime = formatTime(val?.totalReadingTime) ? formatTime(val?.totalReadingTime) : '0분';
  const bestTime = formatTime(val?.maxReadingTime) ? formatTime(val?.maxReadingTime) : '0분';
  const remainingTime = val?.remainingTime > 30 * 24 * 60 ? '기다리고 있을게요' : formatTime(val?.remainingTime);

  return (
    <StatisticsDiv>
      <ItemDivContainer>
        <TotalStatisticsItem
          title={'처음 읽은 날'}
          content={startDate}
          icon={<NotStartedOutlinedIcon sx={{ width: '24px', height: '24px', color: 'var(--main-color)' }} />}
        />
        {status !== 'COMPLETE' &&
          <TotalStatisticsItem
            title={'완독까지 남은 시간'}
            content={remainingTime}
            icon={<MenuBookIcon sx={{ width: '24px', height: '24px', color: 'var(--main-color)' }} />}
            />
          }
        {status === 'COMPLETE' &&
          <TotalStatisticsItem
          title={'완독 일자'}
          content={completeDate}
          icon={<MenuBookIcon sx={{ width: '24px', height: '24px', color: 'var(--main-color)' }} />}
          />
        }
      </ItemDivContainer>
      <ItemDivContainer>
        <TotalStatisticsItem
          title={'책 읽은 시간'}
          content={readingTime}
          icon={<WatchLaterOutlinedIcon sx={{ width: '24px', height: '24px', color: 'var(--main-color)' }} />}
        />
        <TotalStatisticsItem
          title={'최고 집중 시간'}
          content={bestTime}
          icon={<TimerOutlinedIcon sx={{ width: '24px', height: '24px', color: 'var(--main-color)' }} />}
        />
      </ItemDivContainer>
    </StatisticsDiv>
  );
};

const StatisticsDiv = styled.div`
  width: 300px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 20px;
  background: rgba(235, 235, 235, 0.6);
  background: rgba(194, 215, 255, 0.6);
  margin: 15px auto 15px auto;
  display: flex; 
  justify-content: space-evenly;
  align-items: center;
  // gap: 0.25rem
`;

const ItemDivContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 92px;
  width: 130px;
  justify-content: space-between;
`;

export default BookTotalStatistics;