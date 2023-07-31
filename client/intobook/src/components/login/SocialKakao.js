import React from 'react';
import KakaoLoginLogo from "../../assets/img/login/kakao_login_medium_wide.png";

const SocialKakao = () => {
    const REST_API_KEY='2a0475ea5e357cae99c961c374780e07' //REST API KEY (카카오 API를 사용하기 위한 인증키)
    const REDIRECT_URI = 'http://localhost:3000/' // 사용자가 카카오 인증을 마치고 돌아올 페이지의 URL
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code` 
    // 카카오 로그인 버튼 클릭 시 실행되는 함수
    const handleLogin = ()=>{
        // kakaoURL로 페이지를 리다이렉트하여 카카오 인증 페이지로 이동
        window.location.href = kakaoURL
  };

  return (
    // 카카오 로그인 버튼, 버튼 클릭 시 handleLogin 함수가 실행됩니다.
    <button onClick={handleLogin}>
      <img src={KakaoLoginLogo} alt="Kakao Login Logo" />
    </button>
  );
};

export default SocialKakao;
