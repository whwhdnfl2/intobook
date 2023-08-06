import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isModalVisible } from '../../recoil/tutorial/modalAtom.js';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Page = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
`;

const SmallButton = styled.button`
  margin-top: 20px;
`;

const TutorialModal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const [modal, setModal] = useRecoilState(isModalVisible);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLater = () => {
    setModal(false);
  }

  return (

    <ModalWrapper>
      <ModalContent>
        {/* 페이지 내용 */}
        {currentPage === 1 && <p>첫 번째 페이지 내용</p>}
        {currentPage === 2 && <p>두 번째 페이지 내용</p>}
        {currentPage === 3 && <p>세 번째 페이지 내용</p>}

        {/* 페이지네이션 */}
        <PaginationWrapper>
          <Page onClick={handlePrevPage}>이전</Page>
          <Page onClick={handleNextPage}>다음</Page>
        </PaginationWrapper>

        {/* '나중에 보기' 버튼 */}
        <SmallButton onClick={handleLater}>나중에 보기</SmallButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default TutorialModal;
