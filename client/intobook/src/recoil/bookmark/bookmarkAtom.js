import { atom } from 'recoil';

// 블루투스/북갈피 통신되면 default 값 없애기

// 블루투스 연결 상태
export const BluetoothAtom = atom({
    key: 'BluetoothAtom',
    default: true
});

// 북갈피 현재 상태
export const BookmarkStatusAtom = atom({
    key: 'BookmarkStatusAtom',
    default: true
});


// 책갈피와 연동 중인 책
export const ReadingBookAtom = atom({
    key: 'ReadingBookAtom',
    default: null
});