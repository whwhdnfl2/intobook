import React from 'react';
import TotalStatisticsItem from '../common/TotalStatisticsItem';
import MenuBook from '@mui/icons-material/MenuBook';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import Layers from '@mui/icons-material/Layers';
import { styled } from 'styled-components';

const UserTotalStatistic = () => {
  // api 통신 통해 값 받아오기
  const totalReaded = '12권';
  const bestStreak = '10일';
  const readPages = '121,234쪽';
  const totalTime = '123시간 23분';

  return (
    <StatisticsDiv>
      <ItemDivContainer>
        <TotalStatisticsItem
          title={'총 읽은 권수'}
          content={totalReaded}
          icon={<MenuBook sx={{ width: '26px', height: '26px', color: 'var(--main-color)' }} />}
        />
        <TotalStatisticsItem
          title={'총 독서 시간'}
          content={totalTime}
          icon={<WatchLaterOutlinedIcon sx={{ width: '26px', height: '26px', color: 'var(--main-color)' }} />}
        />
      </ItemDivContainer>
      <ItemDivContainer>
        <TotalStatisticsItem
          title={'총 읽은 쪽수'}
          content={readPages}
          icon={<Layers sx={{ width: '26px', height: '26px', color: 'var(--main-color)' }} />}
        />
        <TotalStatisticsItem
          title={'최장 연속 독서일'}
          content={bestStreak}
          icon={<EmojiEvents sx={{ width: '26px', height: '26px', color: 'var(--main-color)' }} />}
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

export default UserTotalStatistic;