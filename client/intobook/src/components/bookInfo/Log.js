import React, { useState } from 'react';
import MenuPopup from '../common/MenuPopup';
import { Card, CardContent } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSetRecoilState } from 'recoil';
import { LogAtom } from '../../recoil/book/BookAtom';
import { styled } from 'styled-components';

const Log = ({ log }) => {
  const startTime = log?.startTime;
  const endTime = log?.endTime;

  // 시간 형태 변형 함수
  function formatDateTime(dateTimeString, includeDate = true) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    if (includeDate) {
      return `${year}.${month}.${day} ${hours}:${minutes}`;
    } else {
      return `${hours}:${minutes}`;
    }
  }

  const formattedStartTime = formatDateTime(startTime);
  const formattedEndTime = formatDateTime(endTime, false);

  const minutes = log?.readingTime % 60;
  const hours = (log?.readingTime - minutes) / 60;

  const formattedReadingTime =
    hours > 0
      ? minutes > 0
        ? `${hours}시간 ${minutes}분`
        : `${hours}시간`
      : `${minutes}분`;

  // 이후에는 로그당 독서 시간 받아오기
  const comment = log?.comment || '한줄평을 작성해보세요';

  // 수정하기/삭제하기 menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const setSelectedLog = useSetRecoilState(LogAtom);

  const openMenuHandler = (e) => {
    setAnchorEl(e.currentTarget);
    setSelectedLog({
      historyPk: log?.historyPk,
      startTime,
      endTime,
      comment: log?.comment,
      readingTime: log?.readingTime
    });
  };

  const closeMenuHandler = () => {
    setAnchorEl(null);
  };

  return (
    <LogCard sx={{ borderRadius: '10px', boxShadow: 'none', height: 'auto' }}>
      <StyledCardContent>
        <LogInfo>
          <LogInfoDiv>
            <LogDateTime>{formattedStartTime} ~ {formattedEndTime}</LogDateTime>
            <span>({formattedReadingTime})</span>
          </LogInfoDiv>
          <MoreHorizIcon
            onClick={openMenuHandler}
            aria-controls={open ? 'edit-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          />
        </LogInfo>
        <LogComment>{comment}</LogComment>
        <MenuPopup anchorEl={anchorEl} open={open} onClose={closeMenuHandler} />
      </StyledCardContent>
    </LogCard>
  );
};

const LogCard = styled(Card)`
  width: 296px;
  height: 90px;
  border: 1px solid var(--main-color);
  font-size: 14px;
`;

const StyledCardContent = styled(CardContent)`
  padding: 12px !important;
`;

const LogInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  height: 24px;
`;

const LogInfoDiv = styled.div`
  display: flex;
  align-items: center;
`;

const LogDateTime = styled.span`
  font-size: 13px;
  letter-spacing: 0.3px;
  margin-right: 5px;
`;

const LogComment = styled.div`
  letter-spacing: 1px;
  line-height: 1.3;
`;

export default Log;