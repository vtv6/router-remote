const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = (webpacEnv_, argv) => {
  const isProduction = argv.mode === 'production';
  const isPortalProduction = process.env.PORTAL_ENV === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      publicPath: '/',
      filename: '[name].[contenthash:8].js',
      assetModuleFilename: '[name].[hash:8][ext][query]',
      clean: true,
    },
    // devtool: 'source-map',
    mode: isProduction ? 'production' : 'development',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        // 'react-router-dom/dist/index': path.resolve(__dirname, 'node_modules/react-router-dom'),
      },
    },
    devServer: {
      static: { directory: path.join(__dirname, 'public') },
      compress: true,
      port: 2001,
      proxy: [],
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /\.module.css$/,
          use: getStyleLoaders(isProduction, isPortalProduction, {
            importLoaders: 1,
            sourceMap: !isPortalProduction,
          }),
        },
        {
          test: /\.module.css$/,
          use: getStyleLoaders(isProduction, isPortalProduction, {
            esModule: false,
            importLoaders: 1,
            sourceMap: !isPortalProduction,
            modules: {
              mode: 'local',
              localIdentName: isPortalProduction ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]',
            },
          }),
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /\.module\.(scss|sass)$/,
          use: [
            ...getStyleLoaders(isProduction, isPortalProduction, { importLoaders: 2, sourceMap: !isPortalProduction }),
            'sass-loader',
          ],
        },
        {
          test: /\.module\.(scss|sass)$/,
          use: [
            ...getStyleLoaders(isProduction, isPortalProduction, {
              esModule: false,
              importLoaders: 2,
              sourceMap: !isPortalProduction,
              modules: {
                localIdentName: isPortalProduction ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]',
              },
            }),
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: 'public/index.html',
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        }),
      new ModuleFederationPlugin({
        name: 'manifest_host',
        filename: 'remoteEntry.js',
        exposes: {
          '.': './src/export-App.tsx',
        },
        // shared: ['react', 'react-dom'],
      }),
    ].filter(Boolean),
  };
};

const getStyleLoaders = (isProduction, isPortalProduction, cssOptions) => {
  const loaders = [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    { loader: 'css-loader', options: cssOptions },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isPortalProduction,
      },
    },
  ].filter(Boolean);
  return loaders;
};
