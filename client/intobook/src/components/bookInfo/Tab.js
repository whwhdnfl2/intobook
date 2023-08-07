import React from 'react';
import { useRecoilState } from 'recoil';
import { BookInfoTabAtom } from './../../recoil/book/BookAtom';

const Tab = () => {
  const [selectedTab, setSelectedTab] = useRecoilState(BookInfoTabAtom);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div style={{ display: 'flex', margin: '12px' }}>
      <span
        onClick={() => handleTabClick('statistics')}
        style={{
          paddingRight: '10px',
          color: selectedTab === 'statistics' ? 'black' : '#818181',
          textDecoration: selectedTab === 'statistics' ? 'underline' : 'none',
          cursor: 'pointer'
        }}
      >
        책 통계
      </span>
      <span> | </span>
      <span
        onClick={() => handleTabClick('history')}
        style={{
          padding: '0 10px',
          color: selectedTab === 'history' ? 'black' : '#818181',
          textDecoration: selectedTab === 'history' ? 'underline' : 'none',
          cursor: 'pointer',
        }}
      >
        히스토리
      </span>
    </div>
  );
};

export default Tab;