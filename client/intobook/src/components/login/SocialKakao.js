import React from 'react';
import KakaoLoginLogo from "../../assets/img/login/kakao_login_medium_wide.png";
import { useRecoilState } from 'recoil';
import { IsLoggedIn } from '../../recoil/user/UserAtom';

const SocialKakao = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedIn);
  const kakaoURL = process.env.REACT_APP_API_URL;

  const handleLogin = () => {
      window.location.href = kakaoURL;
      // console.log(sessionStorage.getItem('isLoggedIn'))
      // console.log('잘되고잇냐')
  };

  return (
    // 카카오 로그인 버튼, 버튼 클릭 시 handleLogin 함수가 실행됩니다.
    <div onClick={handleLogin}>
      <img src={KakaoLoginLogo} alt="Kakao Login Logo" />
    </div>
  );
};

export default SocialKakao;
