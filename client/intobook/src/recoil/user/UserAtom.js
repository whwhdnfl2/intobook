import { atom } from 'recoil';

// 유저 정보 위한 아톰
export const UserNameAtom = atom({
    key: 'UserAtom',
    default: ''
});

export const UserBooksAtom = atom({
    key: 'UserAtom',
    default: []
});