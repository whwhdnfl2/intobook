import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom } from './../../recoil/bookmark/bookmarkAtom';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import BluetoothConnect from '../../utils/bluetooth/BluetoothConnect';
import { styled } from 'styled-components';

const Bluetooth = () => {
  const isConnected = useRecoilValue(BluetoothAtom);

  return (
    <BluetoothDiv
      style={{
        color: isConnected ? 'var(--main-color)' : 'var(--bg-gray)',
        fontSize: isConnected ? 'var(--font-h4)' : 'var(--font-h2)',
      }}
    >
      <IconWrapper>
        <BluetoothIcon onClick={BluetoothConnect}/>
      </IconWrapper>
      <span>
        {isConnected ? '북갈피 블루투스 연결중' : '북갈피 블루투스 미연결'}
      </span>
    </BluetoothDiv>
  );
};

const BluetoothDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 30px auto;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export default Bluetooth;