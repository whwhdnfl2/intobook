import React from 'react';
import { Layout } from './../styles/CommonStyle';
import { styled } from 'styled-components';
import { Character, HistoryLogs } from '../components/home';
import ReadingBook from './../components/home/ReadingBook';


const HomePage = () => {
  // reocil 전역 상태에서 값 받아오기
  const nickname = '북빠';

  return (
    <Layout>
      <WelcomeText>Hello, {nickname}님-!</WelcomeText>
      <Character />
      <HistoryLogs />
      <ReadingBook />
    </Layout>
  );
};

const WelcomeText = styled.div`
  font-size: var(--font-h4);
  color: var(--main-green-color);
`

export default HomePage;