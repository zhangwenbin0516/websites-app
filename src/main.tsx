import { FC } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import MicroApp from '@micro-zoe/micro-app'
import RootRouter from './router'

const App: FC = () => {
  return (<Router basename='/'>
    <RootRouter />
  </Router>)
}

const dom: any = document.getElementById('root')
MicroApp.start({
  ssr: true
})
hydrateRoot(dom, <App />)