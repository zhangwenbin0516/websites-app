
import { hydrateRoot } from 'react-dom/client'
import App from '../entry/main'
import '../layout/style/reset.css'
const dom: any = document.getElementById('root')

hydrateRoot(dom, <App />)