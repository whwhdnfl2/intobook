import React, {useState} from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import BookList from './BookList';

const BookshelvesContent = ({ selectedTab }) => {
  const [filter, setFilter] = useState('startedAt'); // 기본 정렬 기준은 등록순
  //필터가 바뀔 때마다 실행되는 함수
  const handleFilterChange = (event) => {
    // setState로 filter 값을 바꿈. 비동기적으로 작동하므로, useEffect에서 api 호출
    setFilter((prev) => event.target.value);
  };

  return (
    <div>
      <FormControl>
        <Select value={filter} onChange={handleFilterChange}>
          <MenuItem value="startedAt">등록순</MenuItem>
          <MenuItem value="author">저자순</MenuItem>
          <MenuItem value="title">제목순</MenuItem>
          <MenuItem value="nowPage">진행률순</MenuItem>
        </Select>
      </FormControl>
      
      {<BookList bookStatus={selectedTab} orderBy={filter}/>}
    </div>
  );
};

export default BookshelvesContent;
