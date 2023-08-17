import React from 'react';
import { StyledUpperNavbar } from '../../styles/navBar/upperNavBar';
import { AppTitle } from './';
import HamburgerBar from './../navBar/HamburgerBar';

const UpperNavbar = () => {

  return (
    <StyledUpperNavbar
      style={{
        position: 'fixed',
        // left: '50%',
        // transform: 'translateX(-50%)',
        display: 'flex',
        width: '90%',
        maxWidth: '360px',
        paddingRight: '1.2rem',
        paddingLeft: '1.2rem',
        justifyContent: 'space-between',
        padding : '0.2rem 1.2rem',
        margin: '0 0 auto',
        background: '#5A7FFF'
      }}
    >
      <AppTitle />
      <HamburgerBar />
    </StyledUpperNavbar>

  );
}

export default UpperNavbar;