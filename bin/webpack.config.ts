import {Configuration} from "webpack"
import webpackBar from "webpackbar"
import compressionWebpackPlugin from "compression-webpack-plugin"
import HtmlWebpackPlugin from 'html-webpack-plugin'
import eslintWebpackPlugin from "eslint-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import path from "path"

export interface PConf {
  [key: string]: string
}
export const resolve = (...dirs: string[]) => {
  return path.resolve(...[__dirname, ...dirs])
}
export const configEnv = () => {
  const params: PConf = {}
  let argv: string[] = []
  if (process.title.indexOf('=') > -1) {
    argv = process.title.split(' ')
    argv = argv.filter(key => key.indexOf('=') > -1)
  } else {
    argv = process.argv.slice(2)
  }
  (argv || []).forEach(name => {
    const [key, value] = name.split('=')
    params[key] = value
  })
  return params
}

export const configs: Configuration = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.json'],
    mainFiles: ["index"],
    alias: {
      '@': resolve('..', 'src'),
      '@assets': resolve('..', 'src/assets'),
      '@style': resolve('..', 'src/style'),
      '@element': resolve('..', 'src/components'),
      '@page': resolve('..', 'src/pages'),
      '@hook': resolve('..', 'src/hooks')
    }
  },
  externals: {
    fs: require('fs')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: resolve('..', 'tsconfig.json')
            }
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '微应用',
      template: resolve('..', 'static/index.html'),
      filename: 'index.html',
      favicon: resolve('..', 'static/favicon.png'),
    }),
    new webpackBar(),
    new compressionWebpackPlugin(),
    new eslintWebpackPlugin({
      context: resolve('..', 'src'),
      cacheLocation: resolve('..', 'cache/eslint')
    })
  ],
  stats: {
    errorDetails: true
  }
}