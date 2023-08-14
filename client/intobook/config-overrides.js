// config-overrides.js
module.exports = function override(config, env) {
    // 여기에 원하는 웹팩 설정을 추가하거나 수정합니다.
    if (env === 'development') {
        config.devServer = {
            ...config.devServer,
            port: 8080,
            liveReload: true,
            host: "localhost",
            allowedHosts: "all",
            open: true,
            client: {
              overlay: true,
              webSocketURL: { hostname: "localhost", port: 8080 },
            },
            compress: true,
          };
      }
    return config;
  };  