import React from 'react';
import { styled } from 'styled-components';

const TotalStatisticsItem = ({ title, content, icon }) => {
  return (
    <ItemDiv>
      <IconDiv>
        {icon}
      </IconDiv>
      <TextDiv>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </TextDiv>
    </ItemDiv>
  );
};

const ItemDiv = styled.div`
  display: flex;
`;

const IconDiv = styled.div`
  width: 32px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #FEFAEB;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
`;

const TextDiv = styled.div`
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
`;

const Title = styled.div`
  color: var(--black);
  font-family: var(--main-font);
  font-size: var(--font-h5);
  margin-bottom: 3px;
  `;
  
  const Content = styled.div`
  color: #3400C8;
  font-family: var(--main-font);
  font-size: var(--font-h5);
`;

export default TotalStatisticsItem;