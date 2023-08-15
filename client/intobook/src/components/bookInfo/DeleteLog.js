import React from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { styled } from 'styled-components';

const DeleteLog = ({ closeModal, onDelete }) => {
  const deleteClickHandler = () => {
    onDelete();
  };

  return (
    <ModalContent>
      <TitleContainter>
        <ErrorOutlineOutlinedIcon />
        <div>삭제하시겠습니까?</div>
      </TitleContainter>
      <ContentDiv>저장된 로그가 삭제 됩니다.</ContentDiv>
      <BtnContainter>
        <StatusButton onClick={closeModal} style={{ border: '1px solid var(--main-color)', color: 'var(--main-color)' }}>취소하기</StatusButton>
        <StatusButton onClick={deleteClickHandler} style={{ background: 'var(--main-color)' }}>삭제하기</StatusButton>
      </BtnContainter>
    </ModalContent>
  );
};

const ModalContent = styled.div`
  min-width: 240px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
`;

const TitleContainter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--main-font);
  font-size: var(--font-h4);
  gap: 12px;
  `;
  
  const ContentDiv = styled.div`
  margin: 1.5rem;
  font-size: var(--font-h5);
`;

const BtnContainter = styled.div`
  width: 190px;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StatusButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 100px;
  border: none;
  background: var(--white);
  color: var(--white);
  text-align: center;
  font-size: var(--font-h6);
  letter-spacing: 0.4px;
  cursor: pointer;
`;

export default DeleteLog;