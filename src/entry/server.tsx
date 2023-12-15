
import { hydrateRoot } from 'react-dom/client'
import App from '@/entry/main'
import '@style/reset.css'
const dom: any = document.getElementById('root')

hydrateRoot(dom, <App />)