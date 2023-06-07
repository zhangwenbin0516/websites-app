import { FC, ReactNode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import RootRouter from './router'

const App: FC = () => {
  return (<Router basename='/'>
    <RootRouter />
  </Router>)
}

const dom: any = document.getElementById('root')
hydrateRoot(dom, <App />)