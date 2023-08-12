import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StyledBottomNavigation from '../../styles/navBar/navBar';
import { useNavigate } from 'react-router-dom';

const SimpleBottomNavigation = () => {
  const [value, setValue] = React.useState('recents');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleStatisticsClick = () => {
    setValue('Statistics');
    navigate('/statistics');
  };

  const handleHomeClick = () => {
    setValue('Home');
    navigate('/');
  };

  const handleBookshelvesClick = () => {
    setValue('Bookshelves');
    navigate('/bookshelves');
  };

  return (
    <StyledBottomNavigation>
      <BottomNavigation
      value={value}
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        width: '90%',
        maxWidth: '360px',
        paddingRight: '1.2rem',
        paddingLeft: '1.2rem',
        borderRadius: '50px',
        boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.8)',
      }}
      >
      <BottomNavigationAction
        label="Statistics"
        value="Statistics"
        icon={<BarChartRoundedIcon />}
        onClick={handleStatisticsClick}
      />
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<HomeRoundedIcon />}
        onClick={handleHomeClick}
      />
      <BottomNavigationAction
        label="Bookshelves"
        value="Bookshelves"
        icon={<BookRoundedIcon />}
        onClick={handleBookshelvesClick}
      />
    </BottomNavigation>
    </StyledBottomNavigation>
  );
};

export default SimpleBottomNavigation;
