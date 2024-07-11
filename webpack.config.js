const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

const config = {
  target: 'node',
  mode: 'none',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    vscode: 'commonjs vscode',
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  devtool: 'source-map', // Ensure source maps are generated
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dashboard.js', '!dashboard.js.map'],
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.accessibility.json'),
      context: path.resolve(__dirname, 'src'),
      emitWarning: true,
    }),
  ],
  ignoreWarnings: [
    {
      module: /node_modules/,
      message: /the request of a dependency is an expression/,
    },
    {
      module: /node_modules/,
      message: /Critical dependency/,
    },
  ],
  infrastructureLogging: {
    level: 'log',
  },
};

const reactConfig = {
  target: 'web',
  mode: 'development',
  entry: './src/react-views/dashboard/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dashboard.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map', // Ensure source maps are generated
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!extension.js', '!extension.js.map'],
    }),
  ],
  ignoreWarnings: [
    {
      module: /node_modules/,
      message: /the request of a dependency is an expression/,
    },
    {
      module: /node_modules/,
      message: /Critical dependency/,
    },
  ],
};

module.exports = [config, reactConfig];
