import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import WebpackBar from "webpackbar";
import nodeExternals from "webpack-node-externals";
import { resolve } from "./utils";
const options: Configuration = {
  entry: {
    main: resolve('src/main.tsx'),
    common: ['react', 'react-dom'],
    router: ['react-router-dom']
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[contenthash:7].js',
    chunkFilename: 'js/[name].[id].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx'],
    alias: {
      "@": resolve('src')
    }
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve('tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: resolve('static/index.html'),
      filename: 'index.html',
      title: '微应用主应用'
    })
  ]
}

export default options;