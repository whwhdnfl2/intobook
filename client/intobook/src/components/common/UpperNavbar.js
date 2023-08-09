import { useState } from 'react';
import * as React from 'react';
import { StyledUpperNavbar, LeftSection, RightSection, CenteredLogo, HiddenHelpIcon } from '../../styles/navBar/upperNavBar';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AccessToken } from '../../recoil/user/UserAtom';
import Modal from './Modal';


const UpperNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(AccessToken);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //쿠키 삭제
  function deleteCookie(cookie_name) {
    document.cookie = cookie_name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  // 로그아웃 동작
  function handleLogout() {
    deleteCookie('accessToken'); // 쿠키 삭제
    setToken(null); // 상태 업데이트
    navigate('/'); // 로그인 페이지로 이동
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

        <NotificationsIcon color="action" />

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