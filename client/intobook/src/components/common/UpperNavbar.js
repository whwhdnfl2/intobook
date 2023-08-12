import React from 'react';
import { StyledUpperNavbar} from '../../styles/navBar/upperNavBar';
import AppTitle from './AppTitle';
import HamburgerBar from './../navBar/HamburgerBar';

const UpperNavbar = () => {

  return (
    <StyledUpperNavbar
      style={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid gray',
        margin: '1rem'
      }}
    >
      <AppTitle />
      <HamburgerBar />
    </StyledUpperNavbar>
  );
}

export default UpperNavbar;