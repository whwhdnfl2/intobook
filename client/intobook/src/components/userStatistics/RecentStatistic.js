import React from 'react';
import styled from 'styled-components';
import BookCharacter from './BookCharacter';
import CharacterStatistic from '../character/CharacterStatistic';


const RecentStatistic = ({ characterData }) => {

  const attention = characterData?.attention;
  const multiRead = characterData?.multiRead;
  const burning = characterData?.burning;
  const mostDay = characterData?.mostActiveWeekDay;
  const mostTime = characterData?.mostActiveTime;
  const mostGenre = characterData?.favoriteGenre;
  //React.Fragment
  return (
    <>
      <CharacterContainer>
        {/* <BookCharacter val={[attention, multiRead, burning]} /> */}
        {/* <CharacterStatistic con1={attention} con2={burning} con3={multiRead}/> */}
        <CharacterStatistic con1={true} con2={false} con3={false}/>
        <TextContainer>
          {attention >= 5 ? (
            <>
            <Text style={{}}>
            <strong>여유</strong>를 즐길 줄 아는 독서가
            </Text>
            <SmallText>
              # 평균 독서시간 30분 이상 <br />
            </SmallText>
            </>
          ) : (
            <>
            <Text style={{}}>
            # 바쁘다 바빠 <strong>갓생</strong> 독서가 <br/>
            </Text>
            <SmallText>
              평균 독서시간 30분 미만
            </SmallText>
            </>
          )}
          {multiRead ? (
            <>
            <Text style={{}}>
            # 한 우물형 독서가
            </Text>
            <SmallText>
            한 번에 <strong>한권</strong>의 책만 읽는  <br />
            </SmallText>
            </>
          ) : (
            <>
            <Text style={{}}>
            # <strong>박학다식형</strong> 독서가 <br/>
            </Text>
            <SmallText>
            한 번에 여러 권의 책을 읽는
            </SmallText>
            </>
          )}
          {burning ? (
            <Text style={{}}># 지금 <strong>푹 빠</strong>져드는 중</Text>
          ) : (
            <Text style={{ }}># 지금 <strong>천천히 빠</strong>져드는 중</Text>
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
    </>
  );
}

const CharacterContainer = styled.div`
  width: 19rem;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  margin: 0px auto;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--main-point-color);
  gap: 6px;
`;

const Text = styled.span`
  font-size: var(--font-h5);
`;

const SmallText = styled.span`
  font-size: var(--font-h6);
  color: gray;
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
