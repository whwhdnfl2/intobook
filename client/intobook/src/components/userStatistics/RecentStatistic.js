import React from 'react';
import styled from 'styled-components';
import BookCharacter from './BookCharacter';


const RecentStatistic = ({ characterData }) => {

  const attention = characterData?.attention;
  const multiRead = characterData?.multiRead;
  const burning = characterData?.burning;
  const mostDay = characterData?.mostActiveWeekDay;
  const mostTime = characterData?.mostActiveTime;
  const mostGenre = characterData?.favoriteGenre;

  return (
    <React.Fragment>
      <CharacterContainer>
        <BookCharacter val={[attention, multiRead, burning]} />
        <TextContainer>
          {attention >= 5 ? (
            <Text style={{ position: 'relative', left: '-30px', textAlign: 'right' }}>
              # 평균 독서시간 <strong>30분 이상</strong> <br />
              여유를 즐길 줄 아는 독서가
            </Text>
          ) : (
            <Text style={{ position: 'relative', left: '-30px', textAlign: 'right' }}>
              # 평균 독서시간 <strong>30분 미만</strong> <br />
              바쁘다 바빠 갓생 사는 독서가
            </Text>
          )}
          {multiRead ? (
            <Text style={{ position: 'relative', left: '-10px', textAlign: 'right' }}>
              # 한 번에 <strong>한권</strong>의 책만 읽는  <br />
              한 우물형 독서가
            </Text>
          ) : (
            <Text style={{ position: 'relative', left: '-10px', textAlign: 'right' }}>
              # 한 번에 <strong>여러 권</strong>의 책을 읽는  <br />
              박학다식형 독서가
            </Text>
          )}
          {burning ? (
            <Text style={{ position: 'relative', left: '-30px', textAlign: 'right' }}># 지금 <strong>푹 빠</strong>져드는 중</Text>
          ) : (
            <Text style={{ position: 'relative', left: '-30px', textAlign: 'right' }}># 지금 <strong>천천히 빠</strong>져드는 중</Text>
          )}
        </TextContainer>
      </CharacterContainer>
      <BoxContainer>
        <ColoredBox color="orange">
          선호 요일 <br />
          {mostDay}</ColoredBox>
        <ColoredBox color="lightgreen">
          선호 시간대 <br />
          {mostTime}</ColoredBox>
        <ColoredBox color="skyblue">
          선호 장르 <br />
          {mostGenre}
        </ColoredBox>
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


export default RecentStatistic;
