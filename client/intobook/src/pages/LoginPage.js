import React from 'react';
import SocialKakao from '../components/login/SocialKakao';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { IsLoggedIn } from '../recoil/user/UserAtom';

const LoginPage = () => {
  // sessionStorage.setItem('isLoggedIn', false);
  // console.log('로그인페이지에서 상태',sessionStorage.getItem('isLoggedIn'))
  function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정
  
    var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
  }

  // const [isLoggedIn,setIsLoggedIn] = useRecoilState(IsLoggedIn);
  let query = window.location.search;
  let param = new URLSearchParams(query);
  let accessToken = param.get("accessToken");
  if (accessToken !== null) {
    setCookie('accessToken', accessToken.slice(7), '3');
    sessionStorage.setItem('isLoggedIn', true);
  }
  // console.log('로그인페이지 확인',isLoggedIn);
  const StyledLoginButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 130vh;
  `

  return ( 
    <StyledLoginButton>
      <SocialKakao />
    </StyledLoginButton>
  );
}

export default LoginPage;