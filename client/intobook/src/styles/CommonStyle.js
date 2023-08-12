import { styled } from 'styled-components';
import { motion } from 'framer-motion';

//기본 배경(기본 모든 페이지에서 공유하는 배경)
export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 1rem;
  background-image: url(/backgroundImg.png);
  background-size: cover;
  background-position: center center;
  /*border: 1px solid lightgray;*/
`;

//full 배경(로그인,책검색 시 사용)
export const LayoutSecond = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 1rem;
  border: 1px solid lightgray;
  background-color: var(--main-color);
  /*border: 1px solid lightgray;*/
`;

export const StyledButton = styled(motion.button)`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    outline: none;
    transition: transform 0.2s, background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }

    &:active {
      transform: scale(0.95);
    }
`;