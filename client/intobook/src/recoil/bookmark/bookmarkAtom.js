import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom: persistBluetooth } = recoilPersist({
    key: "BluetoothHistory",
    storage: sessionStorage,
});

const { persistAtom: persistBookmarkStatus } = recoilPersist({
    key: "BookmarkStatusHistory",
    storage: sessionStorage,
});

// 블루투스 연결 상태
export const BluetoothAtom = atom({
    key: 'BluetoothAtom',
    default: false,
    effects_UNSTABLE: [persistBluetooth]
});

// 북갈피 현재 상태
export const BookmarkStatusAtom = atom({
    key: 'BookmarkStatusAtom',
    default: false,
    effects_UNSTABLE: [persistBookmarkStatus]
});


// 책갈피와 연동 중인 책
export const ReadingBookAtom = atom({
    key: 'ReadingBookAtom',
    default: {}
});