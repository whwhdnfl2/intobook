import React, {useEffect, useState} from 'react';
import { Bookmark, Bluetooth, ReadingBook, CheckButton, Timer, CurrentBookStatus } from '../components/home';
import { Layout, StyleContainer } from './../styles/CommonStyle';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BluetoothComponent from '../components/home/BluetoothComponent';
import ConnectComponent from '../components/home/ConnectComponent';
import ReadingBookComponent from '../components/home/ReadingBookComponent';
import fetchFCMtoken from '../utils/bluetooth/fetchFCMtoken';
import { AlertInfo } from '../components/common';

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    navigate('/')
    fetchFCMtoken();
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
          <ConnectComponent />
          <ReadingBookComponent />
        </StyleContainer>
      </Layout>
    </motion.div>
  );
};

export default HomePage;