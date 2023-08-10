import { atom } from 'recoil';

//액세스 토큰
export const AccessToken = atom({
    key: 'AccessToken',
    default: null
})


// 로그인 여부
export const IsLoggedIn = atom({
    key: 'IsLoggedIn',
    default: false
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