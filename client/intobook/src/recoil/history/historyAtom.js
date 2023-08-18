import { atom } from 'recoil';

// 히스토리pk
export const HistoryPkAtom = atom({
    key: 'HistoryPkAtom',
    default: 'null'
});

export const UpdateSuccessAtom = atom({
    key: 'UpdateSuccessAtom',
    default: false,
});