import { UserAtom } from "./UserAtom";
import { selector } from "recoil";

//유저네임 돌려주는 선택자
export const UsernameSelector = selector({
    key: 'UsernameSelector',
    get: ({get}) => {
        const user = get(UserAtom);
        return user.username;
    }
});

// 유저가 저장한 책 돌려주는 선택자
export const UserBooksSelector = selector({
    key: 'UserBooksSelector',
    get: ({get}) => {
        const user = get(UserAtom);
        return user.userbooks;
    }
});