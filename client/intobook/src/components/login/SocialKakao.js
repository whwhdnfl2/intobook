import React from 'react';
import KakaoLoginLogo from "../../assets/img/login/kakao_login_medium_wide.png";

const SocialKakao = () => {

  const kakaoURL = process.env.REACT_APP_API_URL+"/카카오로그인";

  const handleLogin = () => {
      window.location.href = kakaoURL;
  };

  return (
      <img src={KakaoLoginLogo} alt="Kakao Login Logo" onClick={handleLogin}/>
  );
};

export default SocialKakao;