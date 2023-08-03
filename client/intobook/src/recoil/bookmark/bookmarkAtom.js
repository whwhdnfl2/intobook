import { atom } from 'recoil';

// 블루투스 연결 상태
export const BluetoothAtom = atom({
    key: 'BluetoothAtom',
    default: false
});