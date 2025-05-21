/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import { name as appName } from './app.json';

if (Platform.OS === 'web') {
  // For web, we use the src/index.js entry point
  require('./src/index');
} else {
  // For native platforms, we use the AppRegistry
  const App = require('./src/App').default;
  AppRegistry.registerComponent(appName, () => App);
}
