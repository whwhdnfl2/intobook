// config-overrides.js
module.exports = function override(config, env) {
    // 여기에 원하는 웹팩 설정을 추가하거나 수정합니다.
    if (env === 'production') { // 배포 환경
      config.devServer = undefined; // 배포 환경에서는 개발 서버 설정 필요 없음
      config.output.publicPath = "/"; // 배포된 파일의 경로를 설정
  
      config.optimization = {
        ...config.optimization,
        minimize: true, // 빌드 결과물을 압축
      };
    }
    return config;
  };  