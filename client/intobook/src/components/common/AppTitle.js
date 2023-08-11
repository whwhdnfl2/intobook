import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from "framer-motion";

const AppTitle = () => {
  return (
    <div>
      <>
        <motion.div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "white",
            marginTop: "0.3rem",
            marginLeft: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            color: "blue",
            boxShadow: "4px 5px 3px rgba(0, 0, 0, 0.1)",
          }}
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 1.5, // 애니메이션 지속 시간 (초)
          }}
        >
          B
        </motion.div>
      </>
    </div>
  );
};

export default AppTitle;
