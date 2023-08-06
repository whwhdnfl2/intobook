import { atom } from 'recoil';

export const BookInfoTabAtom = atom({
    key: 'BookInfoTabAtom',
    default: 'statistics'
});

export const HistoryLogAtom = atom({
    key: 'HistoryLogAtom',
    default: {}
}); 