module.exports = function override(config, env) {
  console.log(config.module.rules);
  const urlLoaderConfig = [{
    test: /\.(png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader'
      }
    ]
  }];

  config.module.rules = urlLoaderConfig.concat(config.module.ruless);

  return config;
};
