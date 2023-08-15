module.exports = function override(config, env) {
  //이전의 설정을 그대로 가져오기
  const originalConfig = require(paths.scriptVersion + '/config/webpack.config.' + env);

  // 기존 설정을 수정하거나 추가
  config.devServer = {
    ...config.devServer, // 기존의 설정을 그대로 유지하면서
    port: 3000,
    liveReload: true,
    // host 지정
    host: "0.0.0.0",
    allowedHosts: "all",
    open: true,
    client: {
      overlay: true,
      // 웹소켓 설정
      webSocketURL: { hostname: undefined, pathname: undefined, port: '0' },
    },
    compress: true,
  };

  return config;
};