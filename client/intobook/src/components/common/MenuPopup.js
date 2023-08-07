import React, { useState } from 'react';
import Modal from './Modal';
import { deleteBookHistory } from '../../api/historyApi';
import { Menu, MenuItem } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HistoryLogsAtom, LogAtom } from '../../recoil/book/BookAtom';

const MenuPopup = ({ anchorEl, open, onClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const log = useRecoilValue(LogAtom);
  const [historyLog, setHistoryLog] = useRecoilState(HistoryLogsAtom);

  const deleteLogHandler = async () => {
    try {
      await deleteBookHistory(log.historyPk);
      const updatedHistoryLog = historyLog.filter(item => item.historyPk !== log.historyPk);
      setHistoryLog(updatedHistoryLog);
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  };

  return (
    <>
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
        <MenuItem onClick={() => { onClose(); setOpenModal(true); }} sx={{ fontSize: '12px' }} >수정하기</MenuItem>
        {/* <MenuItem onClick={onClose} sx={{ fontSize: '12px' }}>삭제하기</MenuItem> */}
        <MenuItem onClick={deleteLogHandler} sx={{ fontSize: '12px' }}>삭제하기</MenuItem>
      </Menu>
      <Modal openModal={openModal} setOpenModal={setOpenModal} modalType={'LogEdit'} />
    </>
  );
};

export default MenuPopup;