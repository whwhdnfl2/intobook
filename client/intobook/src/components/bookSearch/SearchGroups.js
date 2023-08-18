import React from 'react';
import { SearchGroup, SearchIcon, SearchMethod } from '../../styles/bookSearch/SearchGroupsStyle';

const SearchGroups = ({ iconSrc, methodText, onClick }) => {
  // const { iconSrc, methodText } = props;

  return (
    <SearchGroup onClick={onClick}>
      <SearchIcon src={iconSrc} alt='icon' />
      <SearchMethod><span>{methodText}</span></SearchMethod>
    </SearchGroup>
  );
};

export default SearchGroups;