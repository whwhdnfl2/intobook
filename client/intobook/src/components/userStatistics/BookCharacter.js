import React from 'react';
import styled from 'styled-components';

const BookCharacter = () => {
  const bookMbti = "https://item.kakaocdn.net/do/553f47ae1857d2c0ccb4825b98c8a1c28f324a0b9c48f77dbce3a43bd11ce785";
  
  return (
    <React.Fragment>
      <CharacterContainer>
        <CharacterImage src={bookMbti} alt="캐릭터" />
        <TextContainer>
          <Text>#박학다식</Text>
          <Text>#초집중</Text>
          <Text>#버닝중</Text>
        </TextContainer>
      </CharacterContainer>
      <BoxContainer>
        <ColoredBox color="orange">선호 요일</ColoredBox>
        <ColoredBox color="lightgreen">선호 시간대</ColoredBox>
        <ColoredBox color="skyblue">선호 장르</ColoredBox>
      </BoxContainer>
    </React.Fragment>
  );
}

const CharacterContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 24px 0px;
`;

const CharacterImage = styled.img`
  display: block; 
  width: 200px;
  height: 200px;
  border-radius: 100%;
  position: relative;
  left: -30px;
  border: 1px solid lightgrey; /* 테두리 설정 */
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`; 

const Text = styled.p``;

const ColoredBox = styled.div`
  width: 96px;
  height: 60px;
  border-radius: 10%;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxContainer = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  margin: 10px 30px;
`;


export default BookCharacter;
