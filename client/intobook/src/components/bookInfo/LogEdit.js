import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LogAtom, HistoryLogsAtom } from '../../recoil/book/BookAtom';
import { styled } from 'styled-components';
import { editBookHistory } from '../../api/historyApi';

const LogEdit = ({ closeModal }) => {
  const logValues = useRecoilValue(LogAtom);
  const [editedComment, setEditedComment] = useState(logValues.comment || '');
  // const [historyLog, setHistoryLog] = useRecoilState(HistoryLogsAtom);

  function formatTime(inputTime) {
    const date = new Date(inputTime);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  }

  function reFormatTime(inputTime) {
    const date = new Date(inputTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    return formattedTime;
  }


  const formattedStartTime = formatTime(logValues?.startTime);
  const formattedEndTime = formatTime(logValues?.endTime);

  const startTime = reFormatTime(formattedStartTime);
  const endTime = reFormatTime(formattedEndTime);



  const handleTextareaChange = (e) => {
    setEditedComment(e.target.value);
  };

  const editLogHandler = async () => {
    try {
      await editBookHistory(logValues.historyPk, startTime, endTime, editedComment);
      // 저장후 히스토리
    } catch (err) {
      console.error(err);
    } finally {
      closeModal()
    }
  };


  // const deleteLogHandler = async () => {
  //   try {
  //     await deleteBookHistory(log.historyPk);
  //     const updatedHistoryLog = historyLog.filter(item => item.historyPk !== log.historyPk);
  //     setHistoryLog(updatedHistoryLog);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     onClose();
  //   }
  // };

  const readingTime = logValues?.readingTime;

  console.log(logValues, 'ggg')

  return (
    <>
      <DateDiv>
        <div>{formattedStartTime}</div>
        <div>{formattedEndTime}</div>
        <div>{readingTime}</div>
      </DateDiv>

      <Textarea
        placeholder={logValues.comment === null ? '한줄평을 작성해보세요' : ''}
        value={editedComment}
        onChange={handleTextareaChange}
        maxLength="120"
      />
      <div>
        <Button onClick={editLogHandler}>save</Button>
        <Button onClick={closeModal} style={{ background: 'var(--white)', border: '1px solid var(--main-color)', color: 'var(--main-color)' }}>back</Button>
      </div>
    </>
  );
};

const DateDiv = styled.div`
  width: 260px;
  height: 200px;
`;

const Textarea = styled.textarea`
  width: 260px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 2px solid var(--main-color);
  background: var(--white);
  color: #000;
  font-family: var(--main-font);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.4px;
  padding: 10px;
`;

const Button = styled.button`
  width: 83px;
  height: 22px;
  border: none;
  border-radius: 100px;
  background: var(--main-color);
  margin: 20px 0 0 10px;
  cursor: pointer;
  
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.4px;
  float: right;
`;

export default LogEdit;