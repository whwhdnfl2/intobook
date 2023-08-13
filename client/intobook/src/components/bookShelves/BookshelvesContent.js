import React, {useState} from 'react';
import BookList from './BookList';
import styled from 'styled-components';

const StyledFormControl = styled.div`
display: flex;
align-items: center;
height: 30px;
border-radius: 4px;
padding: 0 8px;
background-color: rgba(255, 255, 255,0.5);
margin-top: 5px;
margin-bottom: 5px;
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
