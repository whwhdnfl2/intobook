import React from 'react';
import { styled } from 'styled-components';

const BookmarkInfo = ({ closeModal }) => {
  return (
    <ModalContent>
      <Content>
        <div>북갈피가 밖에 나와있는 거 같아요</div>
        <div>
          <Span>어두운 곳</Span> 에 북갈피를 놓고
        </div>
        <div>책 등록을 진행해주세요.</div>
      </Content>
      <StatusButton onClick={closeModal}>닫기</StatusButton>
    </ModalContent>
  );
};

const ModalContent = styled.div`
  min-width: 240px;
  height: 100%;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: var(--main-font);
  font-size: var(--font-h4);
  line-height: 30px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 0.7;
`;

const Span = styled.span`
  display: inline-block;
  color: var(--main-color);
  font-size: var(--font-h3);
`;

const StatusButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 100px;
  border: 1px solid var(--main-color);
  background: var(--white);
  color: var(--main-color);
  text-align: center;
  font-family: var(--main-font);
  font-size: var(--font-h5);
  letter-spacing: 0.4px;
  align-self: flex-end;
  cursor: pointer;
`;

export default BookmarkInfo;