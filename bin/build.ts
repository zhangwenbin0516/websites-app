import webpack from 'webpack';
import { Configuration, Compiler } from 'webpack';
import webpackMerge from 'webpack-merge';
import miniCssExtractPlugin from 'mini-css-extract-plugin';

import { resolve } from './utils';
import webpackConfig from './webpack.config';

const options: Configuration = webpackMerge(webpackConfig, {
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[contenthash:7].js',
    chunkFilename: 'js/[name].[id].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          }
        ],
        exclude: resolve('..', 'node_modules')
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        exclude: resolve('..', 'node_modules')
      },
      {
        test: /\.(png|gif|jpg|jpeg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 0 * 1024,
          name: 'images/[name].[contenthash:7].[ext]'
        },
        exclude: resolve('..', 'node_modules')
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: 'css/[name].[id].css'
    })
  ]
});

const compiler: Compiler = webpack(options);

compiler.run(() => {
  console.log('打包完成')
});