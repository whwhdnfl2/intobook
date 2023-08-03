import { atom } from 'recoil';

// 유저 정보 위한 아톰
export const UserAtom = atom({
    key: 'UserAtom',
    default: {
        username: '',
        userbooks: [],
    }
});