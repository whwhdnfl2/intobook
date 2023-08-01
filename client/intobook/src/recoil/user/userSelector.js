import { userAtom } from "./userAtoms";
import { selector } from "recoil";

//유저네임 돌려주는 선택자
export const usernameSelector = selector({
    key: 'usernameSelector',
    get: ({get}) => {
        const user = get(userAtom);
        return user.username;
    }
});

// 유저가 저장한 책 돌려주는 선택자
export const userBooksSelector = selector({
    key: 'userBooksSelector',
    get: ({get}) => {
        const user = get(userAtom);
        return user.userbooks;
    }
});