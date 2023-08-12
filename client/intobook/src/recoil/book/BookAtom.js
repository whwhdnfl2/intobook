import { atom } from 'recoil';

// 검색 키워드
export const SearchKeywordAtom = atom({
    key: 'SearchKeywordAtom',
    default: '아름다운 동네'
});

// 책 정보 탭
export const BookInfoTabAtom = atom({
    key: 'BookInfoTabAtom',
    default: 'statistics'
});

// 로그 수정 탭
export const LogEditAtom = atom({
    key: 'LogEditAtom',
    default: false
});

// 조회된 히스토리 로그 리스트
export const HistoryLogsAtom = atom({
    key: 'HistoryLogsAtom',
    default: []
});

// 선택된 로그
export const LogAtom = atom({
    key: 'LogAtom',
    default: {}
});

// 선택된 로그의 시작 시간
export const SelectedStartTimeAtom = atom({
    key: 'SelectedStartTimeAtom',
    default: {
        hours: 0,
        minutes: 0,
    }
});

// 선택된 로그의 마친 시간
export const SelectedEndTimeAtom = atom({
    key: 'SelectedEndTimeAtom',
    default: {
        hours: 0,
        minutes: 0,
    }
});

export const TargetTimeAtom = atom({
    key: 'TargetTimeAtom',
    default: {
        hours: 0,
        minutes: 0,
    }
});