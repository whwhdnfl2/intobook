import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BookshelvesContent from './BookshelvesContent';
import { styled } from '@mui/material/styles';

const BookshelvesMain = () => {

  const [selectedTab, setSelectedTab] = useState(''); // 'all', 'read', 'reading' 중 하나로 초기화

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <OverrideCustomTab ab label="전체" value="" selected={selectedTab === ''}/>
        <OverrideCustomTab  label="다 읽은 책" value="COMPLETE" selected={selectedTab === 'COMPLETE'}/>
        <OverrideCustomTab  label="읽고 있는 책" value="READING" selected={selectedTab === 'READING'}/>
      </Tabs>
      <BookshelvesContent selectedTab={selectedTab} />
    </div>
  );
};

const CustomTab = styled(Tab)(({ theme, selected }) => ({
  color: selected ? '#FFFFFF' : 'var(--main-point-color)',
  fontWeight: selected ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold,
  fontFamily: 'NanumSquareNeo-Variable'
}));

const OverrideCustomTab = styled(CustomTab)({
  // Override the selected tab color here
  '&.Mui-selected': {
    color: 'var(--main-color)',
    fontWeight: 'bold'
  },
});

export default BookshelvesMain;
