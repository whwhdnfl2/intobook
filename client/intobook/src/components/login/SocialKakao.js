import React from 'react';
import KakaoLoginLogo from "../../assets/img/login/kakao_login_medium_wide.png";

const SocialKakao = () => {

  const kakaoURL = `http://localhost:8080` 

  const handleLogin = () => {
      window.location.href = kakaoURL;
  };

  return (
    // 카카오 로그인 버튼, 버튼 클릭 시 handleLogin 함수가 실행됩니다.
    <button onClick={handleLogin}>
      <img src={KakaoLoginLogo} alt="Kakao Login Logo" />
    </button>
  );
};

export default SocialKakao;
