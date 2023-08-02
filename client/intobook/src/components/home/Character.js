import React, {useState} from 'react';
import { Box, StyledEngineProvider, Typography } from '@mui/material';
import { styled } from 'styled-components';
import default_char from "../../assets/img/character/default_char.png";
import Modal from './../common/Modal';

const Character = () => {
  // 유저에 따라 imgSrc, nickname, bgColor, desc 다르게 받아오기
  const imgSrc = default_char;
  const nickname = '북빠';
  const bgColor = 'linear-gradient(180deg, #43485A 39.58%, rgba(22, 2, 20, 0.482759) 70.83%, rgba(0, 0, 0, 0) 100%)';
  const desc = 'BOOKMODE를 만들어보세요'; // 캐릭터 유형에 따라 desc 문구 변경

  // status 값 : 캐릭터 유형 -> 캐릭터 유형에 따라 보이는 문구 다르게 보이게 하기
  const status = 1;
  const showNickname = status === 1;

  const [openModal, setOpenModal] = useState(false);

  return (
    <StyledEngineProvider injectFirst>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>

      </Modal>
      <CharacterBox style={{ background: bgColor }} onClick={() => setOpenModal(true)}>
        <CharacterImg src={imgSrc} />
        <div>
          {showNickname && (
            <ChaarcterDesc>
              '{nickname}' 님,
            </ChaarcterDesc>
          )}
          {!showNickname && (
            <ChaarcterDesc>
              당신의 현재 BOOKMODE는
            </ChaarcterDesc>
          )}
          <ChaarcterDesc>
            {desc}
          </ChaarcterDesc>
        </div>
      </CharacterBox>
    </StyledEngineProvider>
  );
};

const CharacterBox = styled(Box)`
  display: flex;
  align-items: center;
  width: 300px;
  height: 238px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 2px solid #FFFFFF;
  filter: drop-shadow(4px 4px 20px rgba(0, 0, 0, 0.15));
  margin: 20px 10px;
`;

const CharacterImg = styled.img`
  width: 144px;
  height: 178px;
`;

const ChaarcterDesc = styled(Typography)`
  font-family: var(--main-font); 
  font-size: var(--font-h3);
  color: var(--white)
`;

export default Character;