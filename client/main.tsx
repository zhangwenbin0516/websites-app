import { FC, StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { APP } from '@/store'
import { RouteComponent } from '@/router'
import '@style/css/style.css'
import microApp from '@micro-zoe/micro-app'

const App: FC = () => {
  useEffect(() => {
    console.log(window)
  })
  return (<StrictMode>
    <APP>
      <RouteComponent />
    </APP>
  </StrictMode>)
}

const app = createRoot(document.getElementById('root') as HTMLElement)
microApp.start()
app.render(<App />)
