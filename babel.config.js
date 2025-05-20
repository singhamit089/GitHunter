module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@managers': './src/managers',
          '@models': './src/models',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@config': './src/config',
          '@navigation': './src/navigation'
        },
      },
    ],
  ],
};
