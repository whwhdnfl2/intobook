import React, {useEffect, useState} from 'react';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import { userbooks } from '../../api/userbookApi';

const BookshelvesContent = ({ selectedTab }) => {
  const [filter, setFilter] = useState('startedAt'); // 기본 정렬 기준은 등록순
  //필터가 바뀔 때마다 실행되는 함수
  const handleFilterChange = (event) => {
    // setState로 filter 값을 바꿈. 비동기적으로 작동하므로, useEffect에서 api 호출
    setFilter((prev) => event.target.value);
    // console.log('이 때 출력해보면, 아직 filter값이 바뀌어있지 않음',filter)
  };

  const fetchBooks = async () => {
    // api 호출
    try {
      const response = await userbooks(filter,0)
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
    console.log('여기서 출력해보면 filter 값이 잘 바뀌어있음',filter)
  }, [filter, selectedTab]);

  return (
    <div>
      {/* 필터 부분 */}
      <FormControl>
        <Select value={filter} onChange={handleFilterChange}>
          <MenuItem value="startedAt">등록순</MenuItem>
          <MenuItem value="author">저자순</MenuItem>
          <MenuItem value="title">제목순</MenuItem>
          <MenuItem value="nowPage">진행률순</MenuItem>
        </Select>
      </FormControl>
      
      {/* 책들 부분 */}
      <div>
        {/* 책 목록을 표시하는 로직을 구현하세요 */}
      </div>
    </div>
  );
};

export default BookshelvesContent;
