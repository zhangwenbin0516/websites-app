import MicroApp from '@micro-zoe/micro-app'
import { FC, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RootRouter from './root.router'

const App: FC = () => {
    useEffect(() => {
        MicroApp.start({
            ssr: true
        })
    }, [])
    return (<Router basename='/'>
        <RootRouter />
    </Router>)
}

export default App