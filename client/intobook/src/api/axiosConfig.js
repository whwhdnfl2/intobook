import Axios from 'axios';
import { useRecoilState } from 'recoil';
import { IsLoggedIn } from '../recoil/user/UserAtom';

const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // 추후 .env 파일에 생성
  headers: {
    "Content-Type": "application/json",
  },
});

var getCookie = function(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
};

axiosInstance.interceptors.request.use(
(config) => {
  
  const accessToken = getCookie('accessToken');

  config.headers['Content-Type'] = 'application/json';
  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
},
(error) => {
  console.log(error);
  return Promise.reject(error);
}
);

export default axiosInstance;