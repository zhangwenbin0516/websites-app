import webpack from 'webpack';
import devWebpack from 'webpack-dev-server';
import Merge from 'webpack-merge';
import { resolve } from '../common/utils';

import webpackConfig from './webpack.config';

const options = Merge(webpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    path: resolve('dist/webpack')
  }
})

const compiler = webpack(options);

const app = new devWebpack({
  historyApiFallback: true,
  hot: true,
  open: true,
  host: 'localhost',
  port: 3000
}, compiler);

app.start();