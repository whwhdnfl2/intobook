import { Link } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const SimpleBottomNavigation = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Link to='/statistics'>
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        </Link>
        <Link to="/">
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </Link>
        <Link to="/bookshelves">
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </Link>
      </BottomNavigation>
    </Box>
  );
}

export default SimpleBottomNavigation;