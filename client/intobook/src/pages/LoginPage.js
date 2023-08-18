import React, { useEffect } from 'react';
import SocialKakao from '../components/login/SocialKakao';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { AccessToken, UserNameAtom } from '../recoil/user/UserAtom';
import { LogoAnimation } from '../components/login/LogoAnimation';
import { LayoutSecond } from '../styles/CommonStyle';
import { getUsername } from '../api/usernameAPI';

const StyledLoginPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    align-items: center;
    justify-content: center;
`

const LogoContainer = styled.div`
    margin: 7rem 0; /* Adjust the margin as needed */
`

const LoginPage = () => {

  const [Token, setToken] = useRecoilState(AccessToken)

  const [userName, setUserName] = useRecoilState(UserNameAtom);


  function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정
  
    var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
  }

  useEffect(()=>{
    let query = window.location.search;
    let param = new URLSearchParams(query);
    let accessToken = param.get("accessToken");
    if (accessToken !== null) {
      setCookie('accessToken', accessToken.slice(7), '3');
      setToken(accessToken.slice(7));

      // getUsername 함수를 호출하여 유저네임을 가져옴
      async function fetchUserName() {
        try {
          const username = await getUsername();
          setUserName(username);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    fetchUserName();
    }
  },[setToken, setUserName]);

  return ( 
    <LayoutSecond>
      <LogoContainer>
        <LogoAnimation/>
      </LogoContainer>
      <SocialKakao />
    </LayoutSecond>
  );
}

export default LoginPage;