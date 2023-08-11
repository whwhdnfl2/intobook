import { useState } from 'react';
import * as React from 'react';
import { StyledUpperNavbar, RightSection } from '../../styles/navBar/upperNavBar';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import intobookFullLogo from '../../assets/img/intobookFullLogo.png';
import { AccessToken } from '../../recoil/user/UserAtom';
import Modal from './Modal';
import { logout } from '../../api/logoutApi';
import AppTitle from './AppTitle';

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
  const handleLogout = async () => {
    const res = await logout(); //로그아웃api 호출
    deleteCookie('accessToken'); // 쿠키에서 액세스토큰 삭제
    setToken(null); // 상태 업데이트
    navigate('/');
  }


  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const navigateHome = () => {
    navigate('/')
  }


  return (
    <StyledUpperNavbar>

        {/* 왜 링크를 넣으면 css가 깨질까? */}
        {/* <CenteredLogo className='logo'>
          <img src={intobookFullLogo} alt="로고" style={{width:'150px',height:'40px'}} onClick={navigateHome}/>
        </CenteredLogo> */}
      
      <AppTitle />    

      <RightSection>
        <HelpIcon onClick={() => { setOpenModal(true) }} color="primary" />

        <Link to='/alarm'>
        <NotificationsIcon color="primary" />
        </Link>

        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size="small"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 0 }}
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