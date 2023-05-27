import { resolve } from "./utils";
import webpack from "webpack";
const options = {
  mode: "development",
  target: "node",
  devtool: "inline-source-map",
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
          name: 'images/[name].[ext]'
        },
        exclude: resolve('..', 'node_modules')
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
export default {
  config: {
    host: "localhost",
    port: 36301,
    options: options
  }
}