
import { createRoot, Root } from 'react-dom/client'
import App from '../entry/main'
import '../layout/style/reset.css'
const dom: any = document.getElementById('root')

const app: Root = createRoot(dom)
app.render(<App />)