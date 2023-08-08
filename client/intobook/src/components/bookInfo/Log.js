import React, { useState } from 'react';
import MenuPopup from '../common/MenuPopup';
import { Card, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { LogAtom } from '../../recoil/book/BookAtom'

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

  // 이후에는 로그당 독서 시간 받아오기
  const pageAmount = log?.pageAmount + 30;
  const comment = log?.comment || '한줄평을 작성해보세요'

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
    <div>
      <LogCard sx={{ borderRadius: '10px', boxShadow: 'none', height: 'auto' }}>
        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', height: '24px' }}>
            <span>{formattedStartTime} ~ {formattedEndTime}  ({log?.readingTime}분)</span>
            <MoreHorizIcon
              onClick={openMenuHandler}
              aria-controls={open ? 'edit-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            />
          </div>
          <div style={{ letterSpacing: 1, lineHeight: 1.3 }}>{comment}</div>
          <MenuPopup anchorEl={anchorEl} open={open} onClose={closeMenuHandler} />
        </CardContent>
      </LogCard>
    </div>
  );
};

const LogCard = styled(Card)`
  width: 296px;
  height: 90px;
  border: 1px solid var(--main-color);
  font-size: 14px;
`;

export default Log; 