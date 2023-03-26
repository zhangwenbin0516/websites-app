import webpack from 'webpack';
import devWebpack from 'webpack-dev-server';
import Merge from 'webpack-merge';
import { resolve } from './utils';

import webpackConfig from './webpack.config';

const options = Merge(webpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'js/[name].js',
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|jpeg|image|webp)$/,
        include: resolve('src'),
        loader: 'url-loader',
        options: {
          limit: 12 * 1024,
          outputPath: "images",
          name: "[name].[ext]",
          publicPath: '/'
        },
        exclude: resolve('node_modules')
      }
    ]
  }
})

const compiler = webpack(options);

const app = new devWebpack({
  historyApiFallback: true,
  hot: true,
  open: true,
  compress: true,
  host: 'localhost',
  port: 3000
}, compiler);

app.start();