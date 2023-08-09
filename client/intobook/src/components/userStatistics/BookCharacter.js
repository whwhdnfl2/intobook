import React from 'react';
import styled from 'styled-components';

const BookCharacter = () => {
  const bookMbti = "https://item.kakaocdn.net/do/553f47ae1857d2c0ccb4825b98c8a1c28f324a0b9c48f77dbce3a43bd11ce785";

  const attention = 3;
  const multiRead = 0.5;
  const burning = false;
  const mostDay = '월요일';
  const mostTime = '오전';
  const mostGenre = '소설';
  
  return (
    <React.Fragment>
      <CharacterContainer>
        <CharacterImage src={bookMbti} alt="캐릭터" />
        <TextContainer>
          {attention >= 5?(
            <Text style={{ position: 'relative', left: '-30px', textAlign: 'right'}}>
            # 평균 독서시간 30분 이상 <br/>
            여유를 즐길 줄 아는 독서가
            </Text>
          ):(
            <Text style={{ position: 'relative', left: '-30px', textAlign: 'right' }}>
              # 평균 독서시간 30분 미만 <br/>
            바쁘다 바빠 갓생 사는 독서가
            </Text>
          )}
          {multiRead >= 1?(
            <Text style={{ position: 'relative', left: '-10px', textAlign: 'right' }}>
              # 한 번에 한권의 책만 읽는  <br/>
              한 우물형 독서가
            </Text>
          ):(
            <Text style={{ position: 'relative', left: '-10px', textAlign: 'right' }}>
              # 한 번에 여러 권의 책을 읽는  <br/>
              박학다식형 독서가
            </Text>
          )}
          {burning ?(
            <Text style={{ position: 'relative', left: '-30px', textAlign: 'right' }}># 지금 푹 빠져드는 중</Text>
          ):(
            <Text style={{ position: 'relative', left: '-30px', textAlign: 'right' }}># 지금 여유롭게 빠져드는 중</Text>
          )}
        </TextContainer>
      </CharacterContainer>
      <BoxContainer>
        <ColoredBox color="orange">
          선호 요일 <br/>
          {mostDay}</ColoredBox>
        <ColoredBox color="lightgreen">
          선호 시간대 <br/>
          {mostTime}</ColoredBox>
        <ColoredBox color="skyblue">
          선호 장르 <br/>
          {mostGenre}</ColoredBox>
      </BoxContainer>
    </React.Fragment>
  );
}

const CharacterContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 12px 0px 36px;
`;

const CharacterImage = styled.img`
  display: block; 
  width: 200px;
  height: 200px;
  border-radius: 100%;
  position: relative;
  left: -40px;
  border: 1px solid lightgrey; 
`;

const TextContainer = styled.div`
  /* display: flex; */
  float: right;
  flex-direction: column;
`; 

const Text = styled.p`
  font-size: 14px;
`;

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
