import React from 'react';
import { StyledUpperNavbar} from '../../styles/navBar/upperNavBar';
import AppTitle from './AppTitle';
import HamburgerBar from './../navBar/HamburgerBar';
import { StyleContainer } from '../../styles/CommonStyle';

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
        margin: '0.5rem auto 0 auto'
      }}
    >
      <AppTitle />
      <HamburgerBar />
    </StyledUpperNavbar>
    
  );
}

export default UpperNavbar;