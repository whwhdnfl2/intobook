import React, {useEffect} from 'react';
import { Bookmark, Bluetooth, ReadingBook, CheckButton, Timer } from '../components/home';
import { Layout } from './../styles/CommonStyle';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BluetoothComponent from '../components/home/BluetoothComponent';
import ConnectComponent from '../components/home/ConnectComponent';

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    navigate('/')
  }, [])

  const slideInVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
      <Layout>
        <WelcomeText
        initial="hidden"
        animate="visible"
        variants={slideInVariants}
        transition={{ duration: 0.5 }}
        >테스트용 문구입니다</WelcomeText>
        <BluetoothComponent />
        <ConnectComponent  />
        {/* <ReadingBookComponent /> */}
        <CheckButton>확인</CheckButton>
      </Layout>
    </motion.div>
  );
};

const WelcomeText = styled(motion.div)`
  font-size: var(--font-h4);
  color: var(--main-color);
  position: absolute;
  transform: translateX(-50%);
`

export default HomePage;