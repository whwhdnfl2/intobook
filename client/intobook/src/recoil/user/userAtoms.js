import {atom} from 'recoil';

// 유저 정보 위한 아톰
export const userAtom = atom({
    key: 'userAtom',
    default: {
        username: '',
        userbooks: [],
    }
});