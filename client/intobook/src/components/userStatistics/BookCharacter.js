import React from 'react';
import styled from 'styled-components';


const BookCharacter = ({ val }) => {
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

  // null일 때 어떤 이미지 넣어줄지 고민하기
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
  left: -40px;
  border: 1px solid lightgrey; 
`;

export default BookCharacter;