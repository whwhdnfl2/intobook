import React from 'react';
import TotalStatisticsItem from './../common/TotalStatisticsItem';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { styled } from 'styled-components';

const BookTotalStatistics = () => {
  // api 통신 통해 값 받아오기
  const startDate = '2023.08.07';
  const readingTime = '117시간 36분';
  const estimatedTime = '1시간 50분';
  const concentrationTime = '25분';
  const endDate = '2023.08.18';

  const status = 'COMPLETE'

  return (
    <StatisticsDiv>
      <ItemDivContainer>
        <TotalStatisticsItem
          title={'처음 읽은 날'}
          content={startDate}
          icon={<NotStartedOutlinedIcon sx={{ width: '26px', height: '26px', color: 'var(--main-color)' }} />}
        />
        {status !== 'COMPLETE' &&
          <TotalStatisticsItem
            title={'완독까지 남은 시간'}
            content={estimatedTime}
            icon={<MenuBookIcon sx={{ width: '26px', height: '26px', color: 'var(--main-color)' }} />}
            />
          }
        {status === 'COMPLETE' &&
          <TotalStatisticsItem
          title={'완독 일자'}
          content={endDate}
          icon={<MenuBookIcon sx={{ width: '26px', height: '26px', color: 'var(--main-color)' }} />}
          />
        }
      </ItemDivContainer>
      <ItemDivContainer>
        <TotalStatisticsItem
          title={'책 읽은 시간'}
          content={readingTime}
          icon={<WatchLaterOutlinedIcon sx={{ width: '26px', height: '26px', color: 'var(--main-color)' }} />}
        />
        <TotalStatisticsItem
          title={'최고 집중 시간'}
          content={concentrationTime}
          icon={<TimerOutlinedIcon sx={{ width: '26px', height: '26px', color: 'var(--main-color)' }} />}
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
  background: #C2D7FF;
  margin: 15px auto 15px auto;
  display: flex; 
  justify-content: space-evenly;
  align-items: center;
`;

const ItemDivContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 92px;
  width: 130px;
  justify-content: space-between;
`;

export default BookTotalStatistics;