import React, {useEffect, useState} from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { userbooks } from '../../api/userbookApi';
import { useRecoilState } from 'recoil';
import { UserBooksAtom } from '../../recoil/user/UserAtom';
import BookCover from './../common/bookCover';

const BookshelvesContent = ({ selectedTab }) => {
  const [filter, setFilter] = useState('startedAt'); // 기본 정렬 기준은 등록순
  const [userBooks, setUserBooks] = useRecoilState(UserBooksAtom)

  const fetchBooks = async () => {
    // api 호출
    try {
      const response = await userbooks(filter,0,selectedTab);
      setUserBooks((prev) => response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
    // console.log('여기서 출력해보면 filter 값이 잘 바뀌어있음',filter)
    console.log('값확인',selectedTab)
    console.log('확인!',userBooks)
  }, [filter, selectedTab]);

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
      
      <div>
        {userBooks.length > 0 ? (
          userBooks.map((book) => (
        <BookCover key={book.userBookPk} image={book.coverImage} alt={"책이미지"}/>
        ))
      ) : (
        <p>책이 없습니다.</p>
      )}
      </div>
    </div>
  );
};

export default BookshelvesContent;
