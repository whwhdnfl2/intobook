import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: "SessionStorage",
    storage: sessionStorage,
})

//액세스 토큰
export const AccessToken = atom({
    key: 'AccessToken',
    default: null,
    effects_UNSTABLE : [persistAtom]
})

// 사용자이름(닉네임)
export const UserNameAtom = atom({
    key: 'UserNameAtom',
    default: ''
});

// 사용자가 저장한 책
export const UserBooksAtom = atom({
    key: 'UserBooksAtom',
    default: []
});