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
        use: [
          {
            loader: 'ts-loader',
          },
        ],
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
<<<<<<< HEAD
  devtool: 'nosources-source-map',
=======
>>>>>>> a0a5a1f8 (Update code to try and fix getResults command)
  plugins: [
    new CleanWebpackPlugin(),
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
  // devtool: 'nosources-source-map',
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
  plugins: [
    new CleanWebpackPlugin(),
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
  // devtool: 'source-map',
};

module.exports = [config, reactConfig];
