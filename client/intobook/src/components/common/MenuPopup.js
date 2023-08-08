import React from 'react';
import { deleteBookHistory } from '../../api/historyApi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { HistoryLogsAtom, LogAtom, LogEditAtom } from '../../recoil/book/BookAtom';
import { Menu, MenuItem } from '@mui/material';

const MenuPopup = ({ anchorEl, open, onClose }) => {
  const log = useRecoilValue(LogAtom);
  const [historyLog, setHistoryLog] = useRecoilState(HistoryLogsAtom);
  const setIsOpenLogEdit = useSetRecoilState(LogEditAtom);

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
        <MenuItem onClick={() => { onClose(); setIsOpenLogEdit(true); }} sx={{ fontSize: '12px' }} >수정하기</MenuItem>
        <MenuItem onClick={deleteLogHandler} sx={{ fontSize: '12px' }}>삭제하기</MenuItem>
      </Menu>
    </>
  );
};

export default MenuPopup;