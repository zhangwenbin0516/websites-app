import {Configuration} from "webpack"
import webpackBar from "webpackbar"
import htmlWebpackPlugin from "html-webpack-plugin"
import compressionWebpackPlugin from "compression-webpack-plugin"
import eslintWebpackPlugin from "eslint-webpack-plugin"
import path from "path"

export const resolve = (...dirs: string[]) => {
  return path.resolve(...[__dirname, ...dirs])
}

export const configs: Configuration = {
  mode: "development",
  entry: {
    main: resolve("..", "src/main.tsx"),
    reactJS: ["react", "react-dom"],
    router: ["react-router-dom"]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.json'],
    alias: {
      '@': resolve('..', 'src'),
      '@style': resolve('..', 'src/styles'),
      '@view': resolve('..', 'src/views'),
      '@element': resolve('..', 'src/components'),
      '@route': resolve('..', 'src/router')
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
    new webpackBar(),
    new htmlWebpackPlugin({
      title: '微应用',
      template: resolve('..', 'static/index.html'),
      filename: 'index.html'
    }),
    new compressionWebpackPlugin(),
    new eslintWebpackPlugin({
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