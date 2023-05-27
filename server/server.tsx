import { StrictMode } from 'react';
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { APP } from '../client/store';
import { RouteComponent } from '../client/router';
import '../client/style/css/style.css';
import microApp from '@micro-zoe/micro-app';

const render = (req: any, res: any, assets: any) => {
  microApp.start()
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <StrictMode>
        <APP>
          <RouteComponent />
        </APP>
      </StrictMode>
    </StaticRouter>,
    {
      bootstrapScripts: assets,
      onShellReady() {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.write(`<!doctype html>
          <html lang="zh-CN">
            <head>
              <meta charset="utf-8" />
              <title>ssr</title>
            </head>
            <body>
            <div class="root" id="root">`)
          pipe(res)
          res.write(`</div>
            </body>
          </html>`)
      },
    }
  )
}

export default render