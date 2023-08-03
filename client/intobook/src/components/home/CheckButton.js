import Button from '@mui/material/Button';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom } from './../../recoil/bookmark/bookmarkAtom'


const CheckButton = () => {
  const setIsConnected = useSetRecoilState(BluetoothAtom);
  const setIsBookmarkOut = useSetRecoilState(BookmarkStatusAtom);

  const bluetoothHandler = () => {
    setIsConnected((status) => !status);
  };

  const bookmarkhHandler = () => {
    setIsBookmarkOut((status) => !status);
  };

  const readingBookHandler = () => {
    setIsConnected((status) => !status);
    setIsBookmarkOut((status) => !status);
  };

  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 10}}>
      <Button variant="contained" onClick={bluetoothHandler}>블루투스</Button>
      <Button variant="contained" onClick={bookmarkhHandler}>책갈피</Button>
      <Button variant="contained" onClick={readingBookHandler}>리딩책</Button>
    </div>
  );
};

export default CheckButton;