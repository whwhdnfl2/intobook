import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LogAtom, LogEditAtom, SelectedStartTimeAtom, SelectedEndTimeAtom } from '../../recoil/book/BookAtom';
import { editBookHistory } from '../../api/historyApi';
import { styled } from 'styled-components';
import DateTime from './DateTime';

const HistoryLogEdit = () => {
  const selectedLog = useRecoilValue(LogAtom);
  const setIsOpenLogEdit = useSetRecoilState(LogEditAtom);
  const [editedComment, setEditedComment] = useState(selectedLog.comment || '');
  const [isOpenTimeEdit, setIsOpenTimeEdit] = useState(false);
  const [editTarget, setEditTarget] = useState('start')
  const selectedStartTime = useRecoilValue(SelectedStartTimeAtom);
  const selectedEndTime = useRecoilValue(SelectedEndTimeAtom);

  // 날짜 데이터 포맷
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(1)}월 ${String(date.getDate()).padStart(1)}일`;
    return formattedDate;
  }

  const date = formatDate(selectedLog.startTime);

  // 수정된 한줄평 editedComment에 반영하기
  const handleTextareaChange = (e) => {
    setEditedComment(e.target.value);
  };

  // DB에 수정 요청 보낼 때 DateTime 포맷
  const saveDate = date.replace(/(\d+)년 (\d+)월 (\d+)일/, (_, year, month, day) => {
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  });

  const saveStartTime = `${selectedStartTime.hours.toString().padStart(2, '0')}:${selectedStartTime.minutes.toString().padStart(2, '0')}:00`;
  const saveEndTime = `${selectedEndTime.hours.toString().padStart(2, '0')}:${selectedEndTime.minutes.toString().padStart(2, '0')}:00`;

  const saveStart = `${saveDate}T${saveStartTime}`;
  const saveEnd = `${saveDate}T${saveEndTime}`;

  // 로그 수정하기
  const editLogHandler = async () => {
    try {
      await editBookHistory(selectedLog.historyPk, saveStart, saveEnd, editedComment);
    } catch (err) {
      console.error(err);
    } finally {
      setIsOpenLogEdit(false);
    }
  };

  const isEditDone = (value) => {
    setIsOpenTimeEdit(!value);
  };

  return (
    <LogEditContainer>
      <Title>히스토리 수정</Title>
      <Content>{date}</Content>
      <TimeContainer>

        <TimeDiv>
          <svg width="20" height="28" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M0 0H12V6L8 10L12 14V20H0V14L4 10L0 6V0ZM10 14.5L6 10.5L2 14.5V18H10V14.5ZM6 9.5L10 5.5V2H2V5.5L6 9.5ZM4 4H8V4.75L6 6.75L4 4.75V4Z" fill="#C2D7FF" />
          </svg>
          <ContentDiv onClick={() => { setIsOpenTimeEdit(true); setEditTarget('start') }}>
            <SubTitle>시작 시간</SubTitle>
            <Content>{selectedStartTime.hours}:{selectedStartTime.minutes}</Content>
          </ContentDiv>
        </TimeDiv>
        <TimeDiv>
          <svg width="20" height="28" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20H0V14L4 10L0 6V0H12V6L8 10L12 14M2 5.5L6 9.5L10 5.5V2H2M6 10.5L2 14.5V18H10V14.5M8 16H4V15.2L6 13.2L8 15.2V16Z" fill="#C2D7FF" />
          </svg>
          <ContentDiv onClick={() => { setIsOpenTimeEdit(true); setEditTarget('end') }}>
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

const TimeDiv = styled.div`
  width: 125px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
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