import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimatedText = styled.div`
  opacity: 0;
  animation: ${slideIn} 0.5s ease-in-out 0.1s forwards;
`;

const AppTitle = () => {
  return (
    <div>
      <AnimatedText>B</AnimatedText>
      <AnimatedText>O</AnimatedText>
      <AnimatedText>O</AnimatedText>
      <AnimatedText>K</AnimatedText>
    </div>
  );
};

export default AppTitle;
