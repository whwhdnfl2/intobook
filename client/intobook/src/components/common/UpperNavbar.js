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

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };


  return (
    <StyledUpperNavbar>
      <AppTitle />
      <AppMenuSection>
        <HamburgerBar/>
      </AppMenuSection>
    </StyledUpperNavbar>
      // <Modal openModal={openModal} setOpenModal={setOpenModal} modalType={'Tutorial'} closeModal={closeModal} />
  );
}

export default UpperNavbar;