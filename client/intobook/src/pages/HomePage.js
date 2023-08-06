import React from 'react';
import { Bookmark, Bluetooth, ReadingBook, CheckButton, Timer } from '../components/home';
import { Layout } from './../styles/CommonStyle';
import { styled } from 'styled-components';
import { Button } from '@mui/material';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase';

const HomePage = () => {
  // HomePage 마운트(?)될 때 
    // 블루투스/북갈피 상태 업데이트하기(bookmarkAtom default 값 사용X, 커스텀 훅 사용)
    // 리딩북 가져오기

  // reocil 전역 상태에서 값 받아오기
  const nickname = '북빠';

  // 권한 허용 시, token 받아오는 함수
  const requestPermission = () => {
    console.log('Requesting permission...');
    //권한을 허용할 것인지 묻는 알림을 띄움. 사용자가 허용시 토큰 받는 로직
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.')
        getToken(messaging).then((currentToken)=>{
          if (currentToken){
            console.log('FCM Token : ',currentToken)
          } else {
            console.log('FCM Token Unavailable')
          }
        }).catch((err)=>{
          console.log('error',err);
        })
      }})};


    function setCookie(cookie_name, value, days) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + days);
      // 설정 일수만큼 현재시간에 만료값으로 지정
    
      var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
      document.cookie = cookie_name + '=' + cookie_value;
    }
  
    let query = window.location.search;
    let param = new URLSearchParams(query);
    let accessToken = param.get("accessToken");
    if (accessToken !== null) {
      setCookie('accessToken', accessToken.slice(7), '3');
    }
    // console.log(getCookie('accessToken'));

  return (
    <Layout>
      <Button onClick={requestPermission}>bluetooth</Button>
      <WelcomeText>Hello, {nickname}님-!</WelcomeText>
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
  color: var(--main-green-color);
`

export default HomePage;