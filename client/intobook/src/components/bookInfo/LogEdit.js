import React, { useState } from 'react';
import { styled } from 'styled-components';

const LogEdit = () => {
  // const [inputValue, setInputValue] = useState(log.comment || '');


  return (
    <div>
      {/* <Input
          placeholder={log?.comment === null ? '한줄평을 작성해보세요' : ''}
          value={inputValue}
          onChange={handleInputChange}
        /> */}
        로그 수정 모달입니다
    </div>
  );
};

const Input = styled.input`
  width: 260px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 2px solid var(--main-color);
  background: var(--white);
  color: #000;
  font-family: var(--main-font);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
  letter-spacing: 0.4px;
`;

export default LogEdit;