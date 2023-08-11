import { useState } from 'react';
import * as React from 'react';
import { StyledUpperNavbar, AppMenuSection } from '../../styles/navBar/upperNavBar';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AccessToken } from '../../recoil/user/UserAtom';
import Modal from './Modal';
import { logout } from '../../api/logoutApi';
import AppTitle from './AppTitle';
import { Notification } from '../navBar/Notification';
import { Question } from '../navBar/Question';
import HamburgerBar from './../navBar/HamburgerBar';

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
      <AppTitle />
      <AppMenuSection>
        <Question onClick={() => { setOpenModal(true) }} />
        <Link to='/alarm'><Notification/></Link>
        <HamburgerBar/>
      </AppMenuSection>
      <Modal openModal={openModal} setOpenModal={setOpenModal} modalType={'Tutorial'} closeModal={closeModal} />
    </StyledUpperNavbar>
  );
}

export default UpperNavbar;