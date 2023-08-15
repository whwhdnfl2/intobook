module.exports = function override(config, env) {
  if (env === 'production') {
    config.devServer = undefined;
    config.output.publicPath = '/';

    config.optimization = {
      ...config.optimization,
      minimize: true,
    };
  } else { // 개발 환경일 때
    config.devServer = {
      port: 3000,
      liveReload: true,
      host: '0.0.0.0',
      allowedHosts: 'all',
      open: true,
      client: {
        overlay: true,
        webSocketURL: { hostname: undefined, pathname: undefined, port: '0' },
      },
      compress: true,
    };
  }

  return config;
};