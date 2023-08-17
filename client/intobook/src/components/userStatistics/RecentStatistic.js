import React from 'react';
import styled from 'styled-components';
import CharacterStatistic from '../character/CharacterStatistic';
import { useRecoilValue } from 'recoil';
import { UserNameAtom } from '../../recoil/user/UserAtom';


const RecentStatistic = ({ characterData }) => {
  const username = useRecoilValue(UserNameAtom)
  const attention = characterData?.attention;
  const multiRead = characterData?.multiRead;
  const burning = characterData?.burning;
  const mostDay = characterData?.mostActiveWeekDay;
  const mostTime = characterData?.mostActiveTime;
  const mostGenre = characterData?.favoriteGenre;
  //React.Fragment
  return (
    <>
      <CharacterContainer style= {{ padding: '0rem 1rem 0rem 1rem' }}>
        {/* <BookCharacter val={[attention, multiRead, burning]} /> */}
        <CharacterStatistic con1={attention} con2={burning} con3={multiRead}
          />
        {/* <CharacterStatistic con1={true} con2={true} con3={true}/> */}
        <TextContainer>
          {attention >= 5 ? (
            <>
            <SmallText>
              # 평균 독서시간 30분 이상 <br />
            </SmallText>
            <Text style={{}}>
            <strong>여유</strong>를 즐길 줄 아는 독서가
            </Text>
            </>
          ) : (
            <>
            <SmallText>
              평균 독서시간 30분 미만
            </SmallText>
            <Text style={{}}>
            # 바쁘다 바빠 <strong>갓생</strong> 독서가 <br/>
            </Text>
            </>
          )}
          {multiRead ? (
            <>
            <SmallText>
            한 번에 <strong>한권</strong>의 책만 읽는  <br />
            </SmallText>
            <Text style={{}}>
            # 한 우물형 독서가
            </Text>
            </>
          ) : (
            <>
            <SmallText>
            한 번에 여러 권의 책을 읽는
            </SmallText>
            <Text style={{}}>
            # <strong>박학다식형</strong> 독서가 <br/>
            </Text>
            </>
          )}
          <SmallText>
            당신은
          </SmallText>
          {burning ? (
            <Text style={{}}># 지금 <strong>푹 빠</strong>져드는 중</Text>
          ) : (
            <Text style={{ }}># 지금 <strong>천천히 빠</strong>져드는 중</Text>
          )}
        </TextContainer>
      </CharacterContainer>
      <BoxContainer>
        {<p>{username}님은</p>}
        <ColoredBoxContainer>
        <ColoredBox color="rgba(255, 0, 0, 0.4)">
          {mostDay}<br />
          에
          </ColoredBox>
        <ColoredBox color="rgba(0, 0, 255, 0.3)">
          {mostTime}<br />
          시간대</ColoredBox>
        <ColoredBox color="rgba(100, 205, 20, 0.4)">
          {mostGenre}<br />
          장르를
        </ColoredBox>
        </ColoredBoxContainer>
        <p>주로 읽는 독서가입니다</p>
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
  font-size: var(--font-h7);
  color: gray;
`;

const ColoredBox = styled.div`
  width: 100px;
  height: 60px;
  border-radius: 10px;
  background-color: ${props => props.color};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color:white;
`;

const ColoredBoxContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-width: 320px;
  padding: 0.5rem;
  margin: 0px auto;
`;


export default RecentStatistic;
