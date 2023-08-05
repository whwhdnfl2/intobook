import React from 'react';
import { styled } from 'styled-components';

const StatusButton = ({ text, onClick }) => {
  return (
    <UpdateStatusButton onClick={onClick}>
      {text}
    </UpdateStatusButton>
  );
};

const UpdateStatusButton = styled.button`
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 20px;
  background: var(--main-color);
  margin: 0 auto;
  
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.4px;
`;

export default StatusButton;