import MicroApp from '@micro-zoe/micro-app'
import { FC, StrictMode, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router } from 'react-router-dom'
import RootRouter from './root.router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import '@/locale'


const queryClient = new QueryClient()
const App: FC = () => {
    useEffect(() => {
        MicroApp.start({
            ssr: true,
        })
        const html = document.documentElement;
        html.style.fontSize = `${(html.clientWidth / 1920).toFixed(5)}px`
    }, [])

    return (<StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <Router basename='/'>
                    <RootRouter />
                </Router>
            </RecoilRoot>
        </QueryClientProvider >
    </StrictMode>)
}

export default App