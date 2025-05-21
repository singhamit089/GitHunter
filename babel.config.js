module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@managers': './src/managers',
          '@screens': './src/screens',
          '@models': './src/models'
        }
      }
    ]
  ]
};
