module.exports = function(api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    },
    plugins: [
      ['module:react-native-dotenv'],
      'react-native-reanimated/plugin'
    ],
    presets: [
      'babel-preset-expo',
      '@babel/preset-flow'
    ]
  };
};
