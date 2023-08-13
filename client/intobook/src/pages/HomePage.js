import React, {useEffect} from 'react';
import { Bookmark, Bluetooth, ReadingBook, CheckButton, Timer, CurrentBookStatus } from '../components/home';
import { Layout, StyleContainer } from './../styles/CommonStyle';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BluetoothComponent from '../components/home/BluetoothComponent';
import ConnectComponent from '../components/home/ConnectComponent';
import ReadingBookComponent from '../components/home/ReadingBookComponent';

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
        <StyleContainer>
          <BluetoothComponent />
          <Timer/>
          <ConnectComponent  />
          <ReadingBookComponent />
          <CheckButton>확인</CheckButton>
        </StyleContainer>
      </Layout>
    </motion.div>
  );
};

export default HomePage;