import React from 'react';
import { updateUserBookStatus } from '../../api/userbookApi';
import { useRecoilState } from 'recoil';
import { ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { styled } from 'styled-components';


const CompleteReadingInfo = ({ closeModal, startExplode }) => {
  const [nowReadingBook, setNowReadingBook] = useRecoilState(ReadingBookAtom);
  const updateLocalstorageHandler = () => {
    localStorage.setItem('hasCloseCompleteBookModal', 'true');
    closeModal();
  };



  const updateStatusHandler = async () => {
    await updateUserBookStatus(nowReadingBook?.userBookPk, 'COMPLETE');
    const modalVal = localStorage.getItem('hasCloseCompleteBookModal');
    if (modalVal === null) {
      localStorage.setItem('hasCloseCompleteBookModal', 'false');
    } else if (modalVal === 'true') {
      localStorage.removeItem('hasCloseCompleteBookModal');
    }
    setNowReadingBook('');
    startExplode()
    closeModal();
  };


  return (
    <ModalWrapper>
      <ModalContent>
        <Content>
          <div>95% 이상 책을 읽으신 거 같아요.</div>
          <div>혹시 끝까지 다 읽으셨나요?</div>
          <div>완독 버튼을 눌러 상태를 업데이트 해주세요!</div>
        </Content>
        <Buttons>
          <StatusButton onClick={updateLocalstorageHandler} style={{ border: '1px solid var(--main-color)', color: 'var(--main-color)' }}>닫기</StatusButton>
          <StatusButton onClick={updateStatusHandler} style={{ background: 'var(--main-color)' }}>완독!</StatusButton>
        </Buttons>
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: relative;
`;

const ModalContent = styled.div`
  min-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  background-color: white;
  padding: 10px;
  text-align: center;
  font-family: var(--main-font);
  font-size: var(--font-h5);
  line-height: 20px;
`;

const Content = styled.div`
  // flex: 1;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // flex-grow: 0.7;
`;

const Buttons = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const StatusButton = styled.button`
  width: 95px;
  height: 30px;
  margin: 0 6px;
  flex-shrink: 0;
  border-radius: 100px;
  border: none;
  background: var(--white);
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: var(--font-h5);
  letter-spacing: 0.4px;
  cursor: pointer;
`;

export default CompleteReadingInfo;