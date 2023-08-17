import React, { useState } from 'react';
import BookCover from './../common/bookCover';
import { styled } from 'styled-components';
import { AlertInfo, BasicButton, Modal } from "../common";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteBookHistory } from "../../api/historyApi";
import { deleteUserBook } from "../../api/userbookApi";
import { useNavigate } from 'react-router-dom';
const BookDesc = ({ bookInfo }) => {
  const tempTitle = bookInfo?.title;
  const tempAauthor = bookInfo?.author;

  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;
  const author = tempAauthor && tempAauthor.includes('(') ? tempAauthor.split('(')[0].trim() : tempAauthor;

  const status = bookInfo?.status;

  const statusInfo =
    status === 'NOWREADING' ? '읽고 있는 책이에요' :
      status === 'READING' ? '읽다 멈춘 책이에요' : '다 읽은 책이에요'

  const statusColor =
    status === 'NOWREADING' ? 'var(--main-color)' :
      status === 'READING' ? '#FFCD1D' : '#FF604B';

  const [openDeleteUserBookModal, setOpenDeleteUserBookModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openUpdateAlert, setOpenUpdateAlert] = useState(false);

  const navigate = useNavigate(); // useNavigate 훅 사용
  const deleteUserBookHandler = async () => {
    try {
      await deleteUserBook(bookInfo.userBookPk);
      navigate('/bookshelves');
    } catch (err) {
      console.error(err);
    } finally {
      setOpenDeleteAlert(true);
    }
  };

  return (
    <BookInfoDiv>
      <BookCover image={bookInfo?.coverImage} alt={title + 'image'}
        customStyle={{ width: '80px', height: '120px', border: '2px solid white', marginRight: '10px' }}
      />

      {/* 삭제 버튼 추가 */}
      <DeleteButtonWrapper>
        
          <FontAwesomeIcon icon={faTrash} size="1x" style={{ color: 'var(--main-point-color)', cursor: 'pointer', margin: '14px' }} onClick={() => deleteUserBookHandler()} />
          {/* <DeleteIcon sx={{ fontSize: '16px' }} /> */}
        
      </DeleteButtonWrapper>

      <Modal openModal={openDeleteUserBookModal} setOpenModal={setOpenDeleteUserBookModal} modalType={'deleteLog'}
        closeModal={() => { setOpenDeleteUserBookModal(false) }} height={'120px'} handleMethod={deleteUserBookHandler}
      />
      {openDeleteAlert &&
        <AlertInfo text={'삭제되었습니다.'} openAlert={openDeleteAlert}
          setOpenAlert={setOpenDeleteAlert} closeAlert={() => { setOpenDeleteAlert(false) }} type={'success'}
        />
      }
      {openUpdateAlert &&
        <AlertInfo text={'수정되었습니다.'} openAlert={openUpdateAlert}
          setOpenAlert={setOpenUpdateAlert} closeAlert={() => setOpenUpdateAlert(false)} type={'success'}
        />
      }

      <BookInfoContentDiv>
        <div style={{ fontSize: 'var(--font-h5)', width: '175px' }}>{title}</div>
        <TempDiv>
          <div>
            <div style={{ fontSize: 'var(--font-h7)', marginBottom: '3px' }}>{author}</div>
            <div style={{ fontSize: 'var(--font-h7)', marginBottom: '4px', color: 'var(--main-color)' }}>{bookInfo?.publisher}</div>
            <span style={{ fontSize: 'var(--font-h7)', color: 'var(--main-color)' }}>{bookInfo?.page}p</span>
          </div>
          <LabelDiv style={{ backgroundColor: statusColor }}>{statusInfo}</LabelDiv>
        </TempDiv>
      </BookInfoContentDiv>
    </BookInfoDiv>
  );
};

const BookInfoDiv = styled.div`
  position: relative; /* 부모 컨테이너를 relative로 설정 */
  width: 310px;
  height: 140px;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 0);
  margin-top: 20px;
  display: flex;
  padding-left: 10px;
  align-items: center;
`;

const BookInfoContentDiv = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  width: 220px;
  height: 110px;
`;

const LabelDiv = styled.div`
  width: 150px;
  height: 40px;
  flex-shrink: 0;
  background: var(--main-green-color);
  color: var(--white);
  font-size: var(--font-h5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const TempDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;


const DeleteButtonWrapper = styled.div`
  position: absolute; /* 절대 위치 설정 */
  top: 0; /* 위쪽으로 0으로 설정하여 부모 컨테이너 상단에 배치 */
  right: 0; /* 오른쪽으로 0으로 설정하여 부모 컨테이너 오른쪽에 배치 */
`;

const DeleteButton = styled.button`
  width: 27px; /* 너비 조절 가능 */
  height: 27px;
  background-color: rgba(0, 0, 1, 0.48);
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default BookDesc;