import webpack, { Compiler, Configuration, DefinePlugin } from "webpack"
import merge from "webpack-merge"
import devServer from "webpack-dev-server"
import { resolve, configs } from "./webpack.config"

const options: Configuration = merge(configs, {
  mode: "development",
  target: ["web", "es2017"],
  devtool: "inline-source-map",
  entry: {
    'react.app': resolve('..', 'src/entry/client.tsx'),
    'react.js': ["react", "react-dom"],
    'react.router': ["react-router-dom"]
  },
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
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: '[name][local]-[hash:base64:5]',
                localIdentContext: resolve('..', 'src'),
                exportGlobals: true,
              }
            }
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
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: '[name][local]-[hash:base64:5]',
                localIdentContext: resolve('..', 'src'),
                exportGlobals: true,
              }
            }
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
    new webpack.DefinePlugin({
      'process.env.mode': JSON.stringify('csr')
    })
  ]
})

const compiler: Compiler = webpack(options)
const argv = process.argv.slice(2)
let prefix: string = 'local'
if (argv.join('&').indexOf('mode=') > -1) {
  argv.find((value, index) => {
    prefix = argv[index].replace('mode=', '')
    return value.indexOf('mode=') > -1
  })
}

import(resolve(`${prefix}.config.ts`)).then(async (res) => {
  const config = (res?.default || {})
  const serve = new devServer({
    host: config.host,
    port: config.port,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
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
    console.log(err, '错误日志')
    console.log('本地访问服务地址：', `http://${config.host}:${config.port}`)
  })
})
