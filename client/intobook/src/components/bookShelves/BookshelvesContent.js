import React, {useState} from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import BookList from './BookList';
import styled from 'styled-components';

const StyledFormControl = styled.div`
display: flex;
align-items: center;
height: 40px;
border: 1px solid #ccc;
border-radius: 4px;
padding: 0 8px;
background-color: white;
margin-top: 10px;
margin-bottom: 10px;
`;

const SelectLabel = styled.label`
margin-right: 8px;
`;

const SelectBox = styled.select`
flex: 1;
border: none;
background-color: transparent;
`;

const BookshelvesContent = ({ selectedTab }) => {
  const [filter, setFilter] = useState('startedAt'); // 기본 정렬 기준은 등록순
  //필터가 바뀔 때마다 실행되는 함수
  const handleFilterChange = (event) => {
    // setState로 filter 값을 바꿈. 비동기적으로 작동하므로, useEffect에서 api 호출
    setFilter((prev) => event.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <StyledFormControl>
        {/* <SelectLabel htmlFor="select">정렬</SelectLabel> */}
        <SelectBox id="select" value={filter} onChange={handleFilterChange}>
          <option value="startedAt">등록순</option>
          <option value="author">저자순</option>
          <option value="title">제목순</option>
          <option value="nowPage">진행률순</option>
        </SelectBox>
      </StyledFormControl>
      </div>
      <div>
        {<BookList bookStatus={selectedTab} orderBy={filter}/>}
      </div>
    </div>
  );
};



export default BookshelvesContent;
