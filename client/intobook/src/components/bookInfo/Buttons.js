import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusButton from './../common/StatusButton';
import { addUserBook, updateUserBookStatus } from '../../api/userbookApi';

const Buttons = ({ bookInfo }) => {
  const navigate = useNavigate();
  const status = bookInfo?.status;
  const userBookId = bookInfo?.userBookPk;
  const bookId = bookInfo?.isbn;

  const content = status === 'NOWREADING' ? '다른 책 읽을래요!' : '지금 읽을래요!';

  const registerBookHandler = async () => {
    if (!status) { // 책장에 없는 책일 경우
      const res = await addUserBook(bookId);
      
      if (res === 'success') {
        navigate('/')
      }
    } else {
      updateStatusHandler()
    }
  };

  const updateStatusHandler = async () => {
    if (status === 'NOWREADING') {
      const res = await updateUserBookStatus(userBookId, 'READING');

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

  const completeStatusHandler = async () => {
    const res = await updateUserBookStatus(userBookId, 'COMPLETE')
    
    if (res === 'success') {
      navigate('/bookshelves')
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <StatusButton text={content} onClick={registerBookHandler} />
      {status && <StatusButton text='다 읽었어요' onClick={completeStatusHandler} /> }
    </div>
  );
};

export default Buttons;