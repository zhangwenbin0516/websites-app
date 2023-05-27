import webpack, { Compiler, Configuration, HotModuleReplacementPlugin } from "webpack"
import merge from "webpack-merge"
import devServer from "webpack-dev-server"
import { resolve, configs } from "./webpack.config"
import serveConf from "./local.config"

const options: Configuration = merge(configs, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: resolve("..", "dist/client"),
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
  }
})

const compiler: Compiler = webpack(options)

const serve = new devServer({
  ...(serveConf.config || {}),
  hot: true,
  open: true,
  compress: true,
  static: {
    directory: resolve('..', 'dist/'),
    publicPath: '/'
  },
  client: {
    overlay: {
      errors: true,
      warnings: true
    }
  },
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
}, compiler)

serve.startCallback((err) => {
  const devConfig = serveConf.config || {}
  console.log(err, '错误日志')
  console.log('本地访问服务地址：', `http://${devConfig.host}:${devConfig.port}`)
})