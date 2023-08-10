import React, { useState } from 'react';
import SearchGroups from './SearchGroups';
import Modal from './../common/Modal';
import { searchIcon, barcodehIcon, bookshIcon } from '../../assets/img/search/searchBottomSheetImg';
import { SearchBottomeSheetDiv, Title, TopLine, Line } from '../../styles/bookSearch/SearchBottomSheetStyle';
import { SwipeableDrawer, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const SearchBottomSheet = ({ isOpen, setIsOpen }) => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const addInBookShelvesHandler = () => {
    console.log(1111)
    setIsOpen(false);
    setOpenModal(true);
  };

  return (
    <Box>
      <SwipeableDrawer anchor='bottom' open={isOpen} onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)}
        BackdropProps={{
          style:
          {
            width: '360px', margin: 'auto'
          }
        }}
        PaperProps={{
          sx: {
            width: '360px', margin: 'auto', borderTopRightRadius: '20px', borderTopLeftRadius: '20px'
          }
        }}>
        <Stack width={360} height={254} >
          <SearchBottomeSheetDiv>
            <Title>
              <span>읽을 책 등록하기</span>
            </Title>
            <TopLine />
            <Link to='/search' style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
              <SearchGroups iconSrc={searchIcon} methodText={'검색하여 등록하기'}></SearchGroups>
            </Link>
            <Line />
            <SearchGroups iconSrc={barcodehIcon} methodText={'바코드로 등록하기'}></SearchGroups>
            <Line />
            <SearchGroups onClick={addInBookShelvesHandler} iconSrc={bookshIcon} methodText={'내 책장에서 등록하기'}></SearchGroups>
            <Line />
          </SearchBottomeSheetDiv>
        </Stack>
      </SwipeableDrawer>
      <Modal openModal={openModal} setOpenModal={setOpenModal} modalType={'readingBook'} closeModal={closeModal} height={'510px'} />
    </Box>
  );
};

export default SearchBottomSheet;