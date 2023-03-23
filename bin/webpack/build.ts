import webpack from 'webpack';
import Merge from 'webpack-merge';

import webpackConfig from './webpack.config';


const options = Merge(webpackConfig, {
  mode: 'production'
});

const compiler = webpack(options);

compiler.run(() => {
  console.log('打包完成')
})