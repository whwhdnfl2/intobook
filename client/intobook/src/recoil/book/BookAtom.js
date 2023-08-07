import { atom } from 'recoil';

export const BookInfoTabAtom = atom({
    key: 'BookInfoTabAtom',
    default: 'statistics'
});

export const HistoryLogsAtom = atom({
    key: 'HistoryLogsAtom',
    default: []
});

export const LogAtom = atom({
    key: 'LogAtom',
    default: {}
}); 