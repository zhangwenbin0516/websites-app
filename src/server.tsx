import { hydrateRoot } from 'react-dom/client'
import App from './app'

const dom = document.getElementById('root') as HTMLElement
const root = hydrateRoot(dom, <App />)
root.render(<App />)