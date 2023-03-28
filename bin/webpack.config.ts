import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import compressionWebpackPlugin from 'compression-webpack-plugin';
import { resolve } from './utils';

const options: Configuration = {
  entry: {
    main: resolve('..', 'src/main.tsx'),
    common: ['react', 'react-dom'],
    router: ['react-router-dom']
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css", ".scss", ".json"],
    alias: {
      "@": resolve('..', 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
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
        test: /\.jsx$/,
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
      filename: 'index.html'
    }),
    new compressionWebpackPlugin()
  ]
};

export default options;