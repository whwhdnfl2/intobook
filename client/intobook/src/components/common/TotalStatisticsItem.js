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
  margin-right: 0.5rem;
`;

const TextDiv = styled.div`
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:0.1rem;
`;

const Title = styled.div`
  color: var(--black);
  font-family: 'NanumSquareNeo-Variable';
  font-size: var(--font-h7);
  margin-bottom: 3px;
  `;
  
  const Content = styled.div`
  color: #3400C8;
  font-family: 'NanumSquareNeo-Variable';
  font-size: var(--font-h6);
  width: 95px;
`;

export default TotalStatisticsItem;