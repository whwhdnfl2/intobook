import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { createBookHistory, completeBookHistory } from '../../api/historyApi';
import { HistoryPkAtom } from '../../recoil/history/historyAtom';
import { styled } from 'styled-components';




const Bluetooth = () => {

  //블루투스 연결상태 상태 및 책갈피 상태 가져오기(둘 다 초기상태 false)
  const [BluetoothConnected, setIsBluetoothConnected] = useRecoilState(BluetoothAtom);
  const [dumy, setBookmark] = useRecoilState(BookmarkStatusAtom);
  const [nowBook,setNowBook] = useRecoilState(ReadingBookAtom);
  const [historyPkAtom, setHistoryPkAtom] = useRecoilState(HistoryPkAtom);
  let bookmark = dumy;
  let historyPk = historyPkAtom;
  let isBluetoothConnected = BluetoothConnected;
  // 블루투스 값 저장을 위한 큐
  const [queue, setQueue] = useState(new Array());

  let [bluetoothDevice, setBluetoothDevice] = useState(null);
  let [Bcharacteristic, setBcharacteristic] = useState(null); 

  const BluetoothConnect = () => {
    
    //블루투스 연결상태가 false일 때, 연결
    if (!isBluetoothConnected) {
        setIsBluetoothConnected(true); //bluetooth 연결 상태 변경
        navigator.bluetooth.requestDevice({
            filters: [{ services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }]
            // acceptAllDevices: true
        })
            .then(device => {
                // Human-readable name of the device.
                console.log('Connecting to GATT Server...');
                setBluetoothDevice(device);
                
                console.log('비동기라 여기선 안찍히는듯',bluetoothDevice)
                // Attempts to connect to remote GATT Server.
                return device.gatt.connect();
            })
            .then(server => {
                // Getting Service…
                console.log('Getting Service...');
                return server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
            })
            .then(service => {
                // Getting Characteristic…
                console.log('Getting Characteristic...');
                return service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');
            })
            .then(characteristic => {
                Bcharacteristic = characteristic;
                return Bcharacteristic.startNotifications().then(_ => {
                    console.log('> Notifications started');
                    Bcharacteristic.addEventListener('characteristicvaluechanged', HandleNotifications);
                });
            })
            .catch(error => { console.error(error); });
    } else {
        setIsBluetoothConnected(false);
        isBluetoothConnected = false;
        bluetoothDevice.gatt.disconnect()
        console.log('여기서 블루투스 연결을 끊어줘야',bluetoothDevice)
        console.log('끊을때 alert로 한번 더 물어봐야하나?')
    }
}

const HandleNotifications = async (event) => {
    let value = event.target.value;
    
    let a = [];

    let tmp2 = "";
    for (let i = 0; i < value.byteLength; i++) { // 압력센서값

        if (value.getUint8(i) == 32) { // 공백의 ASCII 코드값 32
            a.push(('0000' + tmp2).slice(-4)); // 항상 4자리수로 출력하도록 맞춰서 넣음
            tmp2 = "";
        } else {
            tmp2 += String.fromCharCode(value.getUint8(i));
        }
    }


    // 조건에 따른 BookmarkAtom 상태 업데이트

    const illuminance1 = a[0];
    const illuminance2 = a[1];
    const pressure = parseFloat(a[2]); // 문자열을 숫자로 변환
    if (a !== null && a.length == 3){
        queue.push([a[0], a[1], a[2]])
    }
    if (queue.length > 5) {
        queue.shift();
    }
    
    let isSame = true;
    if (queue.length === 5) { // 5개의 연속한 a배열의 값 차이들이 큰 변화가 없을때 정적인 상태가 된것으로 판정
        for (let i = 0; i < 5; i++) {
            if ((Math.abs(queue[i][0]-queue[(i + 1)%5][0]) > 30)||
                (Math.abs(queue[i][1]-queue[(i + 1)%5][1]) > 30)||
                (Math.abs(queue[i][2]-queue[(i + 1)%5][2]) > 15)) {
                    isSame = false;
                }
        }
    }
    console.log('> ' + a.join(' ') + " " + bookmark + " : " + isSame);
    //책을 펼쳤을 때 history api 요청(response로 pk를 받아와서 저장)
    //책을 덮었을 때 history api 요청(params에 pk와 pressure를 넘겨줄 것)
    if (isSame) {
        if (bookmark) {
            if (illuminance1 <= 100 && illuminance2 >= 100 && Math.abs(illuminance1 - illuminance2) >= 70 && pressure >= 30) {
                console.log('책 덮였을때',pressure)
                await completeBookHistory(historyPk, pressure)
                await setBookmark(false);
                bookmark = false;
                console.log(bookmark)
            }
        } else {
            if (illuminance1 >= 100 && illuminance2 >= 100 && Math.abs(illuminance1 - illuminance2) < 70 && pressure <= 50) {
                console.log('책이 펼쳐졌을때 : ', nowBook)
                const res = await createBookHistory(nowBook?.userBookPk)
                await setHistoryPkAtom(res)
                historyPk = res;
                await setBookmark(true);
                bookmark = true;
                console.log(bookmark)
            }
        }
    }
}

  return (
        <StyledBLE onClick={BluetoothConnect} isActive={isBluetoothConnected}>
            <BluetoothIcon/>
        </StyledBLE>
  );
};

const StyledBLE = styled.div`
    width: 60px;
    height: 80px;
    background-color:${({ isActive }) => isActive ? '#F99475' : '#827796'};
    border-radius:30px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${({ isActive }) =>
    isActive
      ? 'inset 0 0 10px rgba(255, 50, 50, 0.), inset 0 0 5px rgba(25, 250, 254, 0.2)'
      : 'inset -5px 0 0px rgba(105, 105, 105, 0.6), inset 0 -5px 0px rgba(180, 240, 200, 0.6)'};
    cursor: pointer;
      `

export default Bluetooth;