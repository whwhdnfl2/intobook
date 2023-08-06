import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { deleteBookHistory } from '../../api/historyApi';

const MenuPopup = ({ anchorEl, open, onClose }) => {
  const deleteHandler = async () => {
    const res = await deleteBookHistory();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'edit-button',
        sx: { padding: 0 }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={onClose} sx={{ fontSize: '12px' }}>수정하기</MenuItem>
      <MenuItem onClick={onClose} sx={{ fontSize: '12px' }}>삭제하기</MenuItem>
    </Menu>
  );
};

export default MenuPopup;