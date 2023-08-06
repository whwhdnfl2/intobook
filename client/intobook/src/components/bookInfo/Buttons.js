import React from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserBookStatus } from '../../api/userbookApi';
import { styled } from 'styled-components';

const Buttons = ({ bookInfo }) => {
  const navigate = useNavigate();
  const status = bookInfo?.status;
  const userBookId = bookInfo?.userBookPk;

  const statusInfo =
    status === 'NOWREADING' ? 'nowReading' :
      status === 'READING' ? 'reading' : 'complete'

  const statusHandle = 
  status === 'NOWREADING' ? '다 읽었어요!' :
    status === 'READING' ? '지금 읽을래요! ' : ''

  const updateStatusHandler = async () => {
    if (status === 'NOWREADING') {
      const res = await updateUserBookStatus(userBookId, 'COMPLETE');

      if (res === 'success') {
        // READING 상태 책 보여주는 모달 띄우기
        navigate('/bookshelves')
      }

    } else if (status === 'READING') {
      const res = await updateUserBookStatus(userBookId, 'NOWREADING');

      if (res === 'success') {
        navigate('/')
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '30px' }}>
      <StatusDiv>{statusInfo}</StatusDiv>
      {status !== 'COMPLETE' && <StatusButton onClick={updateStatusHandler}>{statusHandle}</StatusButton>}
    </div>
  );
};

const StatusDiv = styled.button`
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 20px;
  background: #00A887;
  margin: 0 auto;
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.4px;
`;

const StatusButton = styled.button`
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 20px;
  background: var(--main-color);
  margin: 0 auto;
  cursor: pointer;
  
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.4px;
`;

export default Buttons;