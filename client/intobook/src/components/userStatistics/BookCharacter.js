import React from 'react';
import styled from 'styled-components';

  // const attention = 3;
  // const multiRead = 0.5;
  // const burning = false;
  // const mostDay = '월요일';
  // const mostTime = '오전';
  // const mostGenre = '소설';
  
//   return (
//     <React.Fragment>
//       <CharacterContainer>
//         <CharacterImage src={bookMbti} alt="캐릭터" />
//         <TextContainer>
//           {attention >= 5?(
//             <Text style={{ position: 'relative', left: '-30px', textAlign: 'right', color: 'white'}}>
//             # 평균 독서시간 30분 이상 <br/>
//             여유를 즐길 줄 아는 독서가
//             </Text>
//           ):(
//             <Text style={{ position: 'relative', left: '-30px', textAlign: 'right', color: 'white' }}>
//               # 평균 독서시간 30분 미만 <br/>
//             바쁘다 바빠 갓생 사는 독서가
//             </Text>
//           )}
//           {multiRead >= 1?(
//             <Text style={{ position: 'relative', left: '-10px', textAlign: 'right', color: 'white' }}>
//               # 한 번에 한권의 책만 읽는  <br/>
//               한 우물형 독서가
//             </Text>
//           ):(
//             <Text style={{ position: 'relative', left: '-10px', textAlign: 'right', color: 'white' }}>
//               # 한 번에 여러 권의 책을 읽는  <br/>
//               박학다식형 독서가
//             </Text>
//           )}
//           {burning ?(
//             <Text style={{ position: 'relative', left: '-30px', textAlign: 'right', color: 'white' }}># 지금 푹 빠져드는 중</Text>
//           ):(
//             <Text style={{ position: 'relative', left: '-30px', textAlign: 'right', color: 'white' }}># 지금 여유롭게 빠져드는 중</Text>
//           )}
//         </TextContainer>
//       </CharacterContainer>
//       <BoxContainer>
//         <ColoredBox color="orange">
//           선호 요일 <br/>
//           {mostDay}</ColoredBox>
//         <ColoredBox color="lightgreen">
//           선호 시간대 <br/>
//           {mostTime}</ColoredBox>
//         <ColoredBox color="skyblue">
//           선호 장르 <br/>
//           {mostGenre}</ColoredBox>
//       </BoxContainer>
//     </React.Fragment>
//   );
// }

const CharacterContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookCharacter = ({val}) => {
  const [attention, multiRead, burning] = val;


  const bookBti = {
    1: "https://item.kakaocdn.net/do/553f47ae1857d2c0ccb4825b98c8a1c28f324a0b9c48f77dbce3a43bd11ce785",
    2: "https://item.kakaocdn.net/do/e1cda9dd275c80af8d9df1f131f8481d7154249a3890514a43687a85e6b6cc82",
    3: "https://item.kakaocdn.net/do/69a88c907442210a2747b388dc2eaab57154249a3890514a43687a85e6b6cc82",
    4: "https://item.kakaocdn.net/do/553f47ae1857d2c0ccb4825b98c8a1c28b566dca82634c93f811198148a26065",
    5: "https://item.kakaocdn.net/do/553f47ae1857d2c0ccb4825b98c8a1c2ff1cf2d4e1bdc11c5e3dd410963d18c7",
    6: "https://item.kakaocdn.net/do/553f47ae1857d2c0ccb4825b98c8a1c26fb33a4b4cf43b6605fc7a1e262f0845",
    7: "https://item.kakaocdn.net/do/553f47ae1857d2c0ccb4825b98c8a1c2616b58f7bf017e58d417ccb3283deeb3",
    8: "https://item.kakaocdn.net/do/553f47ae1857d2c0ccb4825b98c8a1c24022de826f725e10df604bf1b9725cfd",
  }

let imageKey = null;

if (attention >= 5) {
  if (!multiRead && !burning) imageKey = 1;
  else if (!multiRead && burning) imageKey = 2;
  else if (multiRead && !burning) imageKey = 3;
  else if (multiRead && burning) imageKey = 4;
} else {
  if (!multiRead && !burning) imageKey = 5;
  else if (!multiRead && burning) imageKey = 6;
  else if (multiRead && !burning) imageKey = 7;
  else if (multiRead && burning) imageKey = 8;
}

  return (
    <div>
      <CharacterImage src={bookBti[imageKey]} alt="캐릭터" />
    </div>
  );
};

const CharacterImage = styled.img`
  display: block; 
  width: 200px;
  height: 200px;
  border-radius: 100%;
  position: relative;
  border: 1px solid lightgrey; 
`;

const TextContainer = styled.div`
  display: flex;
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
