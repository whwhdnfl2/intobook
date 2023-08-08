import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LogAtom } from '../../recoil/book/BookAtom';
import { styled } from 'styled-components';
import { editBookHistory } from '../../api/historyApi';

const LogEdit = ({ closeModal }) => {
  const logValues = useRecoilValue(LogAtom);
  const [editedComment, setEditedComment] = useState(logValues.comment || '');

  const handleTextareaChange = (e) => {
    setEditedComment(e.target.value);
  };

  const editCommentHandler = async () => {
    // historyPk 필요
    const res = await editBookHistory(50, editedComment);

  };

  return (
    <>
      <Textarea
        placeholder={logValues.comment === null ? '한줄평을 작성해보세요' : ''}
        value={editedComment}
        onChange={handleTextareaChange}
        maxLength="100"
      />
      <div>
        <Button onClick={editCommentHandler}>save</Button>
        <Button onClick={closeModal} style={{ background: 'var(--white)', border: '1px solid var(--main-color)', color: 'var(--main-color)' }}>back</Button>
      </div>
    </>
  );
};

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