import React from 'react'
import register from '@babel/register'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Router from '../src/router'
import { Context } from 'koa'

register({
  presets: ['@babel/env', '@babel/react', '@babel/typescript'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-modules-commonjs']
})

const streamRender = async (ctx: Context, assets: any) => {
  return new Promise((resolve) => {
    const { pipe, abort } = renderToPipeableStream(<StaticRouter location={'/'}>
    <Router />
    </StaticRouter>, {
      bootstrapScripts: assets,
      onShellReady() {
        ctx.response.status = 200
        ctx.set('Content-Type', 'text/html')
        ctx.res.write(`<html lang="zh-CN">
          <head>
            <meta charset="utf-8" />
            <title>虚拟世界</title>
          </head>
          <body>
            <div id="root">`)
          pipe(ctx.res)
          ctx.res.write(`</div>
          </body>
          </html>`)
          resolve({})
      },
      onShellError(error) {
        console.log(error)
      },
      onError() {
        console.log('asdasdasd')
      }
    })
    setTimeout(abort, 5000)
  })
}

export default streamRender