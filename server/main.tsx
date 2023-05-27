import { FC, StrictMode, useEffect } from 'react'
import { hydrateRoot } from 'react-dom/client'
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
microApp.start()
hydrateRoot(document.getElementById('root') as HTMLElement, <App />)
