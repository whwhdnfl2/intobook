import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { BookInfoTabAtom } from './../../recoil/book/BookAtom';
import { styled } from 'styled-components';

const Tab = () => {
  const [selectedTab, setSelectedTab] = useRecoilState(BookInfoTabAtom);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    setSelectedTab('statistics');
  }, [])


  return (
    <TabContainer>
      <TabItem
        selected={selectedTab === 'statistics'}
        onClick={() => handleTabClick('statistics')}
      >
        책 통계
      </TabItem>
      <TabItem
        selected={selectedTab === 'history'}
        onClick={() => handleTabClick('history')}
      >
        히스토리
      </TabItem>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  margin: 10px 12px;
`;

const TabItem = styled.span`
  margin: 0 15px 0 5px;
  padding-bottom: 5px;
  color: ${props => props.selected ? 'var(--main-color)' : '#818181'};
  cursor: pointer;
  border-bottom: ${props => props.selected ? '3px solid var(--main-color)' : 'none'};
`;

export default Tab;