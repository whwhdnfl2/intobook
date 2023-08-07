import React from 'react';
import { styled } from 'styled-components';

const ProgressBar = ({ progress, containerWidth }) => {
  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#F5911C',
    borderRadius: 'inherit',
    textAlign: 'right',
  }

  return (
    <div style={{ width: `${containerWidth}px`, margin: '0 auto' }}>
      <Progress>{`${progress}% 다 왔어요`}</Progress>
      <ContainerDiv>
        <div style={fillerStyles}></div>
      </ContainerDiv>
    </div>
  );
};

const Progress = styled.div`
  color: var(--gray);
  font-family: var(--main-font);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 3px;
  text-align: right;
`;

const ContainerDiv = styled.div`
  height: 16px;
  width: 100%;
  background-color: #D9D9D9;
  border-radius: 50px;
`;

export default ProgressBar;