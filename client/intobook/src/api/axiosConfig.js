import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: process.env.REACT_APP_API_URL,  // 추후 .env 파일에 생성
  headers: {
    "Content-Type": "application/json",
  },
});

// 추후 로그인이 필요한 부분에 interceptors 로직 추가
// https://third9.github.io/posts/Axios%EB%8B%A4%EC%96%91%ED%95%98%EA%B2%8C_%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0-interceptor/

export default axiosInstance;