const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const config = {
  target: 'node',
  mode: 'none',
  entry: './src/extension.ts',  // This should point to your main TypeScript entry file
  output: {
    path: path.resolve(__dirname, 'dist/eslint'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    vscode: 'commonjs vscode',
    eslint: 'commonjs eslint',
    canvas: {},
    'utf-8-validate': {},
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'eslint-plugin-jsx-a11y': path.resolve(
        __dirname,
        'node_modules/eslint-plugin-jsx-a11y'
      ),
    },
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
  devtool: 'nosources-source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  infrastructureLogging: {
    level: 'verbose',
  },
};

const reactConfig = {
  target: 'web',
  mode: 'development',
  entry: './src/react-views/dashboard/components/dashboard.js',  // Updated entry point
  output: {
    path: path.resolve(__dirname, 'dist/dashboard'),
    filename: 'dashboard.js',  // Updated output filename
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
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: 'source-map',
  infrastructureLogging: {
    level: 'log',
  },
};

module.exports = [config, reactConfig];
