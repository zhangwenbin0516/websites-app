import webpack, { Configuration } from "webpack"
import merge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import koa from "koa"
import Router from "@koa/router"
import koaStatic from "koa-static"
import React from "react"
import { renderToPipeableStream } from "react-dom/server"
import {resolve, configs} from "./webpack.config"
import APP from "../src/app"

const args = process.argv.splice(2)
let prefix: string = 'local'
const argv = args.find(key => key.indexOf('mode=') > -1)
if (argv) {
  prefix = argv.substr(argv.indexOf("=")+1, argv.length) || 'local'
}
const options: Configuration = merge({
  mode: "development",
  devtool: "inline-source-map",
  target: "web",
  entry: {
    main: resolve("..", "src/server.tsx"),
    reactJS: ["react", "react-dom"],
    router: ["react-router-dom"]
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
  watch: true,
  externalsPresets: {
    node: true
  },
  externals: [nodeExternals()]
}, configs)
webpack(options, function(err, opts: any) {
  if (!err) {
    import(resolve(`${prefix}.config.ts`)).then(res => {
      const config = (res?.default || {}).config
      const optJSON = opts?.toJson({assets: true})
      const assets = optJSON.assets || []
      const etsJSON: string[] = []
      assets.filter((key: any) =>{
        if (!/\.html?$/.test(key.name)) {
          etsJSON.push(`http://${config.host}:${config.port}/${key.name}`)
        }
      })
      const app: koa = new koa({
        proxy: true
      })
      app.use(koaStatic(resolve('..', 'dist/server')))
      const router: Router = new Router()
      router.get('/', (ctx) => {
        const props: any = {url: ctx.url || '/'}
        const { pipe, abort } = renderToPipeableStream(React.createElement(APP, props), {
          bootstrapScripts: etsJSON,
          onShellReady() {
            ctx.respond = false
            ctx.response.status = 200
            ctx.set("Content-Type", "text/html")
            pipe(ctx.res)
            ctx.res.end()
          },
          onShellError() {},
          onError() {}
        })
        setTimeout(abort, 5000)
      })
      app.use(router.routes())
      const serve = app.listen(config.port, config.host)
      serve.addListener('listening', function() {
        console.log(`访问服务地址:http://${config.host}:${config.port}`)
      })
      serve.addListener('error', function(error) {
        console.log(`服务启动失败:${error}`)
      })
    })
  }
})
