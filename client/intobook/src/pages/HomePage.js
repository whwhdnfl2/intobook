import React from 'react';
import { Bookmark, Bluetooth, ReadingBook, CheckButton } from '../components/home';
import { Layout } from './../styles/CommonStyle';
import { styled } from 'styled-components';

const HomePage = () => {
  // HomePage 마운트(?)될 때 
    // 블루투스/북갈피 상태 업데이트하기(bookmarkAtom default 값 사용X, 커스텀 훅 사용)
    // 리딩북 가져오기

  // reocil 전역 상태에서 값 받아오기
  const nickname = '북빠';

  return (
    <Layout>
      <WelcomeText>Hello, {nickname}님-!</WelcomeText>
      <CheckButton>확인</CheckButton>
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