// 转换ts语法
import register from "@babel/register";
import webpack from "webpack";
import merge from "webpack-merge";
import webpackConfig from "./webpack.config";
// 引入koa服务
import Koa from "koa";
import Router from "koa-router";
import render from "../server/server"

// 注册babel插件
register({
  ignore: ["node_modules"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-transform-modules-commonjs"]
})
// 解析启动参数
const argvs = process.argv.splice(2);
const prefix = (function() {
  let pre: string = "local"
  for(let i=0; i<argvs.length; i++) {
    if (argvs[i].indexOf("mode=")) {
      pre = argvs[i].split("=")[1]
    }
  }
  return pre
})();

// 解析配置文件
import(`${__dirname}/${prefix}.config.ts`).then((res: any) => {
  const config = (res["default"] || res).config
  // 合并webpack配置
  const options = merge(webpackConfig, config.options || {mode: "development"})
  webpack(options, (err, opts) => {
    if (!err) {
      const optJSON = opts?.toJson({assets: true})
      const assets = optJSON?.assets || []
      const jsLists: string[] = [];
      assets.filter(({name}) => {
        if (/^[js\/]/.test(name)) {
          jsLists.push(`http://${config.host}:${config.port}/${name}`)
        }
      })
      const app: Koa = new Koa();
      const router: Router = new Router();
      router.get("/*", (req, res) => {
        render(req, res, jsLists)
      })
      app.use(router.routes());
      const serve = app.listen(config.port, config.host);
      serve.addListener("listening", function() {
        console.log(`http访问地址：http://${config.host}:${config.port}`)
      });
      serve.addListener("error", function(err: any) {
        console.log(`服务启动异常！${err}`)
      });
    }
  })
});