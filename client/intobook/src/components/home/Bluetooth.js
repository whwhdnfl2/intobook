import React from 'react';
import { getBluetoothStatus } from './../../api/bluetoothApi';
import { BluetoothAtom } from './../../recoil/bookmark/bookmarkAtom';
import { useRecoilState } from 'recoil';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { styled } from 'styled-components';

const Bluetooth = () => {
  const [isConnected, setIsConnected] = useRecoilState(BluetoothAtom);

  // 블루투스 연결 상태 받아오는 핸들러
  const bluetoothHandler = async () => {
    // const bluetoothStatus = await getBluetoothStatus();
    const bluetoothStatus = !isConnected;
    setIsConnected(bluetoothStatus);
  };

  return (
    <BluetoothDiv
      style={{
        color: isConnected ? 'var(--main-color)' : 'var(--bg-gray)',
        fontSize: isConnected ? 'var(--font-h5)' : 'var(--font-h2)',
      }}
    >
      <IconWrapper>
        <BluetoothIcon />
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