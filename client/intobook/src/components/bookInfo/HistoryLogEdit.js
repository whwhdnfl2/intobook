import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LogAtom, LogEditAtom, SelectedStartTimeAtom, SelectedEndTimeAtom } from '../../recoil/book/BookAtom';
import { editBookHistory } from '../../api/historyApi';
import { AlertInfo } from './../common';
import DateTime from './DateTime';
import { motion } from "framer-motion";
import { formatDate, formatTimeInDate } from './../../utils/dateTimeUtils';
import { UpdateSuccessAtom } from '../../recoil/history/historyAtom';
import { styled } from 'styled-components';

const HistoryLogEdit = () => {
  const selectedLog = useRecoilValue(LogAtom);
  const setIsOpenLogEdit = useSetRecoilState(LogEditAtom);
  const [editedComment, setEditedComment] = useState(selectedLog.comment || '');
  const [isOpenTimeEdit, setIsOpenTimeEdit] = useState(false);
  const [editTarget, setEditTarget] = useState('start')
  const selectedStartTime = useRecoilValue(SelectedStartTimeAtom);
  const selectedEndTime = useRecoilValue(SelectedEndTimeAtom);
  const setUpdateSuccess = useSetRecoilState(UpdateSuccessAtom);
  const [openAlert, setOpenAlert] = useState(false);


  const startDate = formatDate(selectedLog.startTime, 'dateLetter');
  const endDate = formatDate(selectedLog.endTime, 'dateLetter');

  const originStartTime = formatTimeInDate(selectedLog.startTime);
  const originEndTime = formatTimeInDate(selectedLog.endTime);

  const startHour = selectedStartTime.hours;
  const startMinute = selectedStartTime.minutes;
  const endHour = selectedEndTime.hours;
  const endMinute = selectedEndTime.minutes;

  const isFirst = selectedLog.isFirst;

  // 수정된 한줄평 editedComment에 반영하기
  const handleTextareaChange = (e) => {
    setEditedComment(e.target.value);
  };

  // DB에 수정 요청 보낼 때 DateTime 포맷
  const saveStartDate = startDate.replace(/(\d+)년 (\d+)월 (\d+)일/, (_, year, month, day) => {
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  });

  const saveEndDate = endDate.replace(/(\d+)년 (\d+)월 (\d+)일/, (_, year, month, day) => {
    if (originStartTime.split(':')[0] > 21 && originEndTime.split(':')[0] > 21 && endHour < 3) {
      return `${year}-${month.padStart(2, '0')}-${parseInt(day.padStart(2, '0')) + 1}`;
    } else {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  });

  const removeMillisecond = (date) => {
    const [datePart, timePart] = date.split('T');
    return `${datePart}T${timePart.split('.')[0]}`;
  }

  const saveStartTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
  const saveEndTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

  const saveStart = originStartTime === saveStartTime ? removeMillisecond(selectedLog.startTime) : `${saveStartDate}T${saveStartTime}:00`;
  const saveEnd = originEndTime === saveEndTime ? removeMillisecond(selectedLog.endTime) : `${saveEndDate}T${saveEndTime}:00`;

  // 로그 수정하기
  const editLogHandler = async () => {
    const selectedStartTimeInMinutes = startHour * 60 + startMinute;
    const selectedEndTimeInMinutes = endHour * 60 + endMinute;

    if (
      selectedEndTimeInMinutes >= selectedStartTimeInMinutes || // 종료시간이 시작시간보다 커야 함
      (selectedStartTimeInMinutes >= 22 * 60 + 30 && // 시작시간이 22:30 이후인 경우
        (selectedEndTimeInMinutes >= 0 && selectedEndTimeInMinutes <= 2 * 60)) // 종료시간이 00:00부터 02:00 사이면 괜찮음
    ) {
      try {
        await editBookHistory(selectedLog.historyPk, saveStart, saveEnd, editedComment);
      } catch (err) {
        console.error(err);
      } finally {
        setIsOpenLogEdit(false);
        setUpdateSuccess(true);
      }
    } else {
      // alert('시간을 확인하세요')
      setOpenAlert(true);
    }
  };

  const isEditDone = (value) => {
    setIsOpenTimeEdit(!value);
  };

  return (
    <LogEditContainer>
      <Title>히스토리 수정</Title>
      <Content>{startDate}</Content>
      <TimeContainer>
        <TimeDiv
          isfirst={isFirst.toString()}
          onClick={isFirst ? () => { setIsOpenTimeEdit(true); setEditTarget('start') } : null}
          whileTap={{
            scale: 1.05,
            background: 'var(--bg-gray)',
            transition: { duration: 0.05, ease: 'easeInOut' } // 여기에서 속도 조절
          }}
          initial={{ scale: 1, background: 'var(--white)' }}
          animate={{ scale: 1, background: 'var(--white)' }}
          exit={{ scale: 1, background: 'var(--white)' }}
        >
          <svg width="20" height="28" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M0 0H12V6L8 10L12 14V20H0V14L4 10L0 6V0ZM10 14.5L6 10.5L2 14.5V18H10V14.5ZM6 9.5L10 5.5V2H2V5.5L6 9.5ZM4 4H8V4.75L6 6.75L4 4.75V4Z" fill="#C2D7FF" />
          </svg>
          <ContentDiv>
            <SubTitle>시작 시간</SubTitle>
            <Content>{selectedStartTime.hours}:{selectedStartTime.minutes}</Content>
          </ContentDiv>
        </TimeDiv>
        <TimeDiv
          isfirst={isFirst.toString()}
          onClick={isFirst ? () => { setIsOpenTimeEdit(true); setEditTarget('end') } : null}
          whileTap={{
            scale: 1.05,
            background: 'var(--bg-gray)',
            transition: { duration: 0.05, ease: 'easeInOut' } // 여기에서 속도 조절
          }}
          initial={{ scale: 1, background: 'var(--white)' }}
          animate={{ scale: 1, background: 'var(--white)' }}
          exit={{ scale: 1, background: 'var(--white)' }}
        >
          <svg width="20" height="28" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20H0V14L4 10L0 6V0H12V6L8 10L12 14M2 5.5L6 9.5L10 5.5V2H2M6 10.5L2 14.5V18H10V14.5M8 16H4V15.2L6 13.2L8 15.2V16Z" fill="#C2D7FF" />
          </svg>
          <ContentDiv onClick={isFirst ? () => { setIsOpenTimeEdit(true); setEditTarget('end') } : null}>
            <SubTitle>마친 시간</SubTitle>
            <Content>{selectedEndTime.hours}:{selectedEndTime.minutes}</Content>
          </ContentDiv>
        </TimeDiv>
      </TimeContainer>
      {isOpenTimeEdit ? (
        <DateTime onSave={isEditDone} targetType={editTarget} />
      ) : (
        <div>
          <CommentDiv
            placeholder={editedComment === null ? '' : '한줄평을 작성해보세요'}
            value={editedComment}
            onChange={handleTextareaChange}
            maxLength="110"
          />
          <div>
            <Button onClick={editLogHandler}>저장하기</Button>
            <Button onClick={() => setIsOpenLogEdit(false)} style={{ background: 'var(--white)', border: '1px solid var(--main-color)', color: 'var(--main-color)' }}>뒤로 가기</Button>
          </div>
        </div>
      )}
      {openAlert &&
        <AlertInfo text={'시간을 다시 설정해주세요'} openAlert={openAlert}
          setOpenAlert={setOpenAlert} closeAlert={() => setOpenAlert(false)}
        />
      }
    </LogEditContainer>
  );
};

const LogEditContainer = styled.div`
  width: 260px;
  height: 290px;
  background: #C2D7FF;
  border-radius: 20px;
  margin: 10px auto;
  padding: 20px;
  font-family: var(--main-font);
`;

const Title = styled.div`
  font-size: var(--font-h3);
  line-height: 20px
  letter-spacing: 0.4px;
  margin-bottom: 10px;
  `;

const SubTitle = styled.div`
  color: #808080;
  font-size: var(--font-h5);
  margin-bottome: 5px;
`;

const Content = styled.div`
  font-size: var(--font-h4);
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeDiv = styled(motion.div)`
  width: 125px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  cursor: ${props => props.isfirst === 'true' ? 'pointer' : 'default'};
  `;

const ContentDiv = styled.div`
  margin-left: 10px;
`;

const CommentDiv = styled.textarea`
  all: unset;
  &:focus {
    outline: none;
  }
  resize: none;
  width: 240px;
  height: 110px;
  flex-shrink: 0;
  background: var(--white);
  border-radius: 15px;
  margin: 0 auto;
  padding: 10px;
`;

const Button = styled.button`
  width: 83px;
  height: 22px;
  border: none;
  border-radius: 100px;
  background: var(--main-color);
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
  
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: var(--font-h5);
  letter-spacing: 0.4px;
  float: right;
`;

export default HistoryLogEdit;