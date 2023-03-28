import webpack from 'webpack';
import { Compiler, Configuration } from 'webpack';
import devServer from 'webpack-dev-server';
import webpackMerge from 'webpack-merge';
import { resolve } from './utils';
import webpackConfig from './webpack.config';

const options: Configuration = webpackMerge(webpackConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  output: {
    path: resolve('..', 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
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
            loader: 'style-loader'
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
  }
});

const compiler: Compiler = webpack(options);

const server = new devServer({
  host: 'localhost',
  port: 3000,
  hot: true,
  compress: true
}, compiler);

server.startCallback((err) => {
  const devConfig = server.options;
  console.log(err, 'errstart')
  console.log(`http://${devConfig.host}:${devConfig.port}`)
});