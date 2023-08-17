import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import BasicButton from './BasicButton';


const Tutorial = ({ closeModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  // const closeModal = () => {
  //   setOpenModal
  // }

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <ModalContent>
      {/* 페이지 내용 */}
      {currentPage === 1 && <PageContent>첫 번째 페이지 내용 </PageContent>}
      {currentPage === 2 && <PageContent>두 번째 페이지 내용 </PageContent>}
      {currentPage === 3 && <PageContent>세 번째 페이지 내용 </PageContent>}
      {currentPage === 4 && <PageContent>네 번째 페이지 내용 </PageContent>}

      {/* 페이지네이션 */}
      <PaginationWrapper>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          hidePrevButton
          hideNextButton
          color="primary"
        />
      </PaginationWrapper>
      
      <div onClick={closeModal}>
        <BasicButton content={'나중에 보기'}  />
      </div>    
    </ModalContent>
  );
};

const ModalContent = styled.div`
  min-width: 240px;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PageContent = styled.div`
  width: 100%;
  height: 300px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
`;

export default Tutorial;
