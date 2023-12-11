import webpack, { Configuration, DefinePlugin } from "webpack"
import merge from "webpack-merge"
import { resolve, configs } from "./webpack.config"
import './server'
const options: Configuration = merge({
  mode: "development",
  devtool: "inline-source-map",
  target: 'node',
  externalsPresets: {
    node: true
  },
  entry: {
    'react.app': resolve('..', 'src//entry/server.tsx'),
    'react.js': ["react", "react-dom"],
    'react.router': ["react-router-dom"]
  },
  output: {
    path: resolve("..", "dist/server"),
    filename: "js/[name].js",
    chunkFilename: "js/[id].js",
    publicPath: "/"
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
          name: 'images/[name].[ext]'
        },
        exclude: resolve('..', 'node_modules')
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.mode': JSON.stringify('ssr')
    })
  ],
  watch: true
}, configs)

webpack(options, (err) => {
  
})
