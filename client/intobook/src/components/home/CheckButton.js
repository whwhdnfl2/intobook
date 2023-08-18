// import Button from '@mui/material/Button';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom'
import fetchFCMtoken from '../../utils/bluetooth/fetchFCMtoken';
import { styled } from 'styled-components';


const CheckButton = () => {
  const setIsConnected = useSetRecoilState(BluetoothAtom);
  const setIsBookmarkOut = useSetRecoilState(BookmarkStatusAtom);
  const setReadingBook = useSetRecoilState(ReadingBookAtom);


  const bluetoothHandler = () => {
    setIsConnected((status) => !status);
  };

  const bookmarkhHandler = () => {
    setIsBookmarkOut((status) => !status);
  };

  // const readingBookHandler = () => {
  //   setReadingBook((val) => '책 있어요');
  // };

  const readingBookHandler = () => {
    setReadingBook((val) => {
      if (val === null) {
        return '등록된 책 있어요';
      } else {
        return null;
      }
    });
  };

  const fcmTokenHandler = () => {
    fetchFCMtoken();
  }

  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 10}}>
      <Button variant="contained" onClick={bluetoothHandler}>블루투스</Button>
      <Button variant="contained" onClick={bookmarkhHandler}>책갈피</Button>
      <Button variant="contained" onClick={fcmTokenHandler}>fmc테스트</Button>
    </div>
  );
};

const Button = styled.div`
  border: 1px solid var(--main-point-color);
  color : var(--main-point-color);
  border-radius: 50px;
  padding: 0.5rem 0.5rem;
  /*box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);*/
  cursor: pointer;
`

export default CheckButton;