import React from 'react'
import http from 'http'
import queryString from 'node:querystring'
import register from '@babel/register'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Router from '../src/router'
import { Context } from 'koa'

register({
  presets: ['@babel/env', '@babel/react', '@babel/typescript'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-modules-commonjs']
})
interface Api {
  host?: string
  port?: number
}

const getUser = (api: Api) => {
  return new Promise((resolve, reject) => {
    http.get({
      ...api,
      path: '/auth/code'
    }, (res) => {
      res.setEncoding('utf-8')
      let lists = {}
      res.on('data', (data) => {
        try{
          lists = JSON.parse(data)
        }catch(e) {
          lists = {}
        }
      })
      res.on('end', () => {
        resolve(lists)
      })
      res.on('error', (e) => {
        reject({
          message: e.message,
          code: 500
        })
      })
    })
  })
}

const streamRender = async (ctx: Context, assets: string[], api: Api = {}) => {
  const uid = ctx.get('uid')
  let userInfo: any = null
  const url = queryString.parse(ctx.url, '/')
  console.log(url)
  return await new Promise((resolve) => {
    const { pipe, abort } = renderToPipeableStream(<StaticRouter location={'/'}>
    <Router />
    </StaticRouter>, {
      bootstrapScripts: assets,
      async onShellReady() {
        if (!uid) {
          userInfo = await getUser(api)
          if (userInfo.code === 200) {
            ctx.res.appendHeader('uid', userInfo.data)
          }
        }
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