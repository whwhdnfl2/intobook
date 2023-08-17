import React from 'react';
import TotalStatisticsItem from '../common/TotalStatisticsItem';
import MenuBook from '@mui/icons-material/MenuBook';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import Layers from '@mui/icons-material/Layers';
import { styled } from 'styled-components';
import { formatDate, formatTime } from './../../utils/dateTimeUtils';

const UserTotalStatistic = ({ val }) => {
  // api 통신 통해 값 받아오기
  const bestStreak = val?.maxReadDaysInRow;
  const totalReadBook = val?.totalReadBook;
  const totalReadPage = val?.totalReadPage;
  const totalReadTime = val?.totalReadTime;


  return (
    <StatisticsDiv>
      <ItemDivContainer>
        <TotalStatisticsItem
          title={'총 읽은 권수'}
          content={`${totalReadBook} 권`}
          icon={<MenuBook sx={{ width: '24px', height: '24px', color: 'var(--main-color)' }} />}
        />
        <TotalStatisticsItem
          title={'총 독서 시간'}
          content={`${totalReadTime} 분`}
          icon={<WatchLaterOutlinedIcon sx={{ width: '24px', height: '24px', color: 'var(--main-color)' }} />}
        />
      </ItemDivContainer>
      <ItemDivContainer>
        <TotalStatisticsItem
          title={'총 읽은 쪽수'}
          content={`${totalReadPage} 쪽`}
          icon={<Layers sx={{ width: '24px', height: '24px', color: 'var(--main-color)' }} />}
        />
        <TotalStatisticsItem
          title={'최장 연속 독서일'}
          content={`${bestStreak} 일`}
          icon={<EmojiEvents sx={{ width: '24px', height: '24px', color: 'var(--main-color)' }} />}
        />
      </ItemDivContainer>
    </StatisticsDiv>
  );
};

const StatisticsDiv = styled.div`
  width: 90%;
  height: 10rem;
  flex-shrink: 0;
  border-radius: 20px;
  background: rgba(235, 235, 235, 0.6);
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

export default UserTotalStatistic;