import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { LogAtom, SelectedStartTimeAtom, SelectedEndTimeAtom, HistoryLogsAtom, LogEditAtom } from '../../recoil/book/BookAtom';
import { UpdateSuccessAtom } from '../../recoil/history/historyAtom';
import { deleteBookHistory } from './../../api/historyApi';
import { formatDate, formatTimeInDate } from '../../utils/dateTimeUtils';
import { Modal, AlertInfo } from './../common';
import { styled } from 'styled-components';

const Log = ({ log }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDeleteLogModal, setOpenDeleteLogModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useRecoilState(UpdateSuccessAtom);
  const [historyLog, setHistoryLog] = useRecoilState(HistoryLogsAtom);
  const setIsOpenLogEdit = useSetRecoilState(LogEditAtom);



  const startTime = log?.startTime;
  const endTime = log?.endTime;

  const formattedStartTime = `${formatDate(startTime, 'dateDot')} ${formatTimeInDate(startTime)}`
  const formattedEndTime = formatTimeInDate(endTime);

  const minutes = log?.readingTime % 60;
  const hours = (log?.readingTime - minutes) / 60;

  const formattedReadingTime =
    hours > 0
      ? minutes > 0
        ? `${hours}시간 ${minutes}분`
        : `${hours}시간`
      : `${minutes}분`;

  const st = new Date(startTime);
  const et = new Date(endTime);

  // 이후에는 로그당 독서 시간 받아오기
  const comment = log?.comment || '한줄평을 작성해보세요';

  // 수정하기/삭제하기 
  const setSelectedLog = useSetRecoilState(LogAtom);
  const setSelectedStartTime = useSetRecoilState(SelectedStartTimeAtom);
  const setSelectedEndTime = useSetRecoilState(SelectedEndTimeAtom);

  const openDropdownHandler = (e) => {
    setIsDropdownOpen(true);
    setSelectedLog({
      historyPk: log?.historyPk,
      startTime,
      endTime,
      comment: log?.comment,
      readingTime: log?.readingTime,
      isFirst: log?.isFirst ? log.isFirst : false
    });
    setSelectedStartTime({
      hours: st.getHours(),
      minutes: st.getMinutes()
    });
    setSelectedEndTime({
      hours: et.getHours(),
      minutes: et.getMinutes()
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      setOpenUpdateAlert(true); // 업데이트 성공 시 알림 띄우기
    }
    setUpdateSuccess(false);
  }, [updateSuccess, setUpdateSuccess]);

  const dropdownRef = useRef(null);

  // Dropdown 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteLogHandler = async () => {
    try {
      await deleteBookHistory(log.historyPk);
      const updatedHistoryLog = historyLog.filter(item => item.historyPk !== log.historyPk);
      setHistoryLog(updatedHistoryLog);
      setOpenDeleteLogModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDropdownOpen(false);
      setOpenDeleteAlert(true);
    }
  };

  return (
    <DropdownContainer>
      <LogCard sx={{ borderRadius: '10px', boxShadow: 'none', height: 'auto' }}>
        <StyledCardContent>
          <LogInfo>
            <LogInfoDiv>
              <LogDateTime>{formattedStartTime} ~ {formattedEndTime}</LogDateTime>
              <span>({formattedReadingTime})</span>
            </LogInfoDiv>
            <MoreHorizIcon onClick={openDropdownHandler} style={{ cursor: 'pointer' }} />
          </LogInfo>
          <LogComment>{comment}</LogComment>
          {isDropdownOpen && (
            <DropdownContent ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DropdownItem onClick={() => { setIsDropdownOpen(false); setIsOpenLogEdit(true); }}>
                <EditIcon sx={{ fontSize: '13px' }} />
                <span> 수정하기</span>
              </DropdownItem>
              <DropdownItem onClick={() => setOpenDeleteLogModal(true)}>
                <DeleteIcon sx={{ fontSize: '14px' }} />
                <span> 삭제하기</span>
              </DropdownItem>
            </DropdownContent>
          )}
        </StyledCardContent>
        <Modal openModal={openDeleteLogModal} setOpenModal={setOpenDeleteLogModal} modalType={'deleteLog'}
          closeModal={() => { setOpenDeleteLogModal(false) }} height={'120px'} handleMethod={deleteLogHandler}
        />
        {openDeleteAlert &&
          <AlertInfo text={'삭제되었습니다.'} openAlert={openDeleteAlert}
            setOpenAlert={setOpenDeleteAlert} closeAlert={() => { setOpenDeleteAlert(false) }}
          />
        }
        {openUpdateAlert &&
          <AlertInfo text={'수정되었습니다.'} openAlert={openUpdateAlert}
            setOpenAlert={setOpenUpdateAlert} closeAlert={() => setOpenUpdateAlert(false)}
          />
        }
      </LogCard>
    </DropdownContainer>
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

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    
`;

const DropdownContent = styled(motion.div)`
    width: 75px;
    position: absolute;
    top: 32px;
    right: 15px;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: right;
    background: var(--white);
    cursor: pointer;
`;

const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px; 
    &:last-child {
        margin-bottom: 0;
    }
`;

export default Log;