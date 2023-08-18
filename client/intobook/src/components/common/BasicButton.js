import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
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

const BasicButton = ({ content }) => {
  return (
    <StyledButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {content}
    </StyledButton>
  );
};

export default BasicButton;