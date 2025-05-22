const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withTamagui } = require('@tamagui/metro-plugin');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    extraNodeModules: {
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@managers': path.resolve(__dirname, 'src/managers'),
      '@models': path.resolve(__dirname, 'src/models'),
    },
  },
  watchFolders: [path.resolve(__dirname, 'src')],
};

module.exports = withTamagui(mergeConfig(defaultConfig, config), {
  components: ['tamagui'],
  config: './tamagui.config.ts',
});
