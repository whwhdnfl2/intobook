import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IsLoggedIn } from '../../recoil/user/UserAtom';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Modal from './Modal';

const StyledUpperNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const CenteredLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  flex-grow: 1;
`;

const HiddenHelpIcon = styled(HelpIcon)`
  visibility: hidden;
`;

const UpperNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedIn); //
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.location.reload(); // 페이지 리로드
  }


  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };


  return (
    <StyledUpperNavbar>
      <LeftSection>
        <HiddenHelpIcon />
        <HiddenHelpIcon />
        <HiddenHelpIcon />
        <HiddenHelpIcon />
      </LeftSection>

      <CenteredLogo className='logo'>
        Book
      </CenteredLogo>

      <RightSection>
        <HelpIcon onClick={() => { setOpenModal(true) }} />
        {/* <Badge badgeContent={4} color="primary"> */}
        <NotificationsIcon color="action" />
        {/* </Badge> */}
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>정보수정</MenuItem>
          <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        </Menu>
      </RightSection>
      <Modal openModal={openModal} setOpenModal={setOpenModal} modalType={'Tutorial'} closeModal={closeModal} />
    </StyledUpperNavbar>
  );
}

export default UpperNavbar;