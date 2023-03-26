import webpack from 'webpack';
import Merge from 'webpack-merge';

import { resolve } from './utils';
import webpackConfig from './webpack.config';

const options = Merge(webpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|jpeg|image|webp)$/,
        include: resolve('src'),
        loader: 'url-loader',
        options: {
          limit: 12 * 1024,
          outputPath: "images",
          name: "[name].[contenthash:5].[ext]",
          publicPath: '/'
        },
        exclude: resolve('node_modules')
      }
    ]
  }
});

const compiler = webpack(options);

compiler.run(() => {
  console.log('打包完成')
})