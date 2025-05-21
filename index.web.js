import { AppRegistry } from 'react-native';
import App from './src/App'; // Updated path to App.tsx
import { name as appName } from './app.json';

// Register the app component
AppRegistry.registerComponent(appName, () => App);

// Mount the app to the HTML
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'), // This ID should match the div in your HTML template
});
