import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';


const Tutorial = ({ closeModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

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

      {/* '나중에 보기' 버튼 */}
      <StyledButton variant="contained" onClick={closeModal}>
        나중에 보기
      </StyledButton>
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

// 여기 왜 important안하면 적용이 안될까
const StyledButton = styled(Button)`
  margin-top: 20px !important;
`;

export default Tutorial;
