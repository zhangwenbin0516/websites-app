import { Configuration } from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as CompressionWebpackPlugin from 'compression-webpack-plugin'
import WebpackBar from 'webpackbar'
import * as ESLintWebpackPlugin from 'eslint-webpack-plugin'
import { resolve } from './utils'
const options: Configuration = {
  entry: {
    main: resolve('..', 'client/main.tsx'),
    common: ['react', 'react-dom'],
    router: ['react-router-dom']
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.json'],
    alias: {
      '@': resolve('..', 'client'),
      '@style': resolve('..', 'client/styles'),
      '@view': resolve('..', 'client/views'),
      '@element': resolve('..', 'client/components'),
      '@route': resolve('..', 'client/router')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ],
        exclude: resolve('..', 'node_modules')
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader',
        exclude: resolve('..', 'node_modules')
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      title: '微应用',
      template: resolve('..', 'static/index.html'),
      filename: 'index.html'
    }),
    new CompressionWebpackPlugin(),
    new ESLintWebpackPlugin({
      fix: true,
      context: resolve('..', 'src'),
      cache: true,
      cacheLocation: resolve('..', 'cache/eslint')
    })
  ],
  stats: {
    errorDetails: true
  }
}

export default options
