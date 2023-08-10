import React, {useEffect} from 'react';
import { Bookmark, Bluetooth, ReadingBook, CheckButton, Timer } from '../components/home';
import { Layout } from './../styles/CommonStyle';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  // HomePage 마운트(?)될 때 
    // 블루투스/북갈피 상태 업데이트하기(bookmarkAtom default 값 사용X, 커스텀 훅 사용)
    // 리딩북 가져오기

  // reocil 전역 상태에서 값 받아오기
  const nickname = '북빠지다'

  const navigate = useNavigate();

  useEffect(()=>{
    navigate('/')
  },[])

  return (
    <Layout>
      <WelcomeText>안녕하세요, {nickname}님!</WelcomeText>
      <CheckButton>확인</CheckButton>
      <Bluetooth />
      <Bookmark />
      <Timer />
      <ReadingBook />
    </Layout>
  );
};

const WelcomeText = styled.div`
  font-size: var(--font-h4);
  color: var(--main-color);
`

export default HomePage;