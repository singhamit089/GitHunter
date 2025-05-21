const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // To access built-in plugins

const appDirectory = path.resolve(__dirname);

const babelLoaderConfiguration = {
  test: /\.(tsx|ts|jsx|js)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'), // Entry point for web
    path.resolve(appDirectory, 'App.tsx'), // Your main App component
    path.resolve(appDirectory, 'src'), // Your source files
    // Add any other paths that need to be compiled
    // path.resolve(appDirectory, 'node_modules/react-native-vector-icons'), // example if you use this
    path.resolve(appDirectory, 'node_modules/@react-navigation'),
  ],
  exclude: /node_modules\/(?!(@react-native|react-native|react-native-vector-icons|@react-navigation)\S*)/, // exclude all node_modules except the ones that need to be compiled
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      configFile: path.resolve(__dirname, 'babel.config.js'), // Explicitly point to the project's Babel config
      babelrc: false, // Ignore .babelrc files in node_modules
      sourceType: 'unambiguous', // Let Babel auto-detect module type
    },
  },
};

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: path.join(appDirectory, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'), // Output directory for bundled files
    filename: 'bundle.web.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      '@managers': path.resolve(appDirectory, 'src/managers'),
      '@screens': path.resolve(appDirectory, 'src/screens'),
      '@models': path.resolve(appDirectory, 'src/models'),
      // Add any other aliases you need
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      // Add other rules for assets like images, fonts if needed
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appDirectory, 'public/index.html'), // Path to your HTML template
    }),
    // new webpack.HotModuleReplacementPlugin(), // Removing this line as devServer.hot handles it
  ],
  devServer: {
    static: {
      directory: path.join(appDirectory, 'dist'),
    },
    compress: true,
    port: 8080, // You can choose any port
    hot: true,
    historyApiFallback: true, // Important for single-page applications
  },
};
