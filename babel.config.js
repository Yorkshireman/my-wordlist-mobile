module.exports = function(api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    },
    plugins: [['module:react-native-dotenv']],
    presets: ['babel-preset-expo']
  };
};
