import React from 'react';
import { Bookmark, Bluetooth, ReadingBook } from '../components/home';
import { Layout } from './../styles/CommonStyle';
import { styled } from 'styled-components';

const HomePage = () => {
  // reocil 전역 상태에서 값 받아오기
  const nickname = '북빠';

  return (
    <Layout>
      <WelcomeText>Hello, {nickname}님-!</WelcomeText>
      <Bluetooth />
      <Bookmark />
      <ReadingBook />
    </Layout>
  );
};

const WelcomeText = styled.div`
  font-size: var(--font-h4);
  color: var(--main-green-color);
`

export default HomePage;