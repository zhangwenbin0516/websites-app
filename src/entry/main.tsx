import MicroApp from '@micro-zoe/micro-app'
import { FC, StrictMode, useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router } from 'react-router-dom'
import RootRouter from './root.router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import '@/locale'


const queryClient = new QueryClient()
const App: FC = () => {
    const win: any = window
    let timeout: NodeJS.Timeout | number = 0
    const [scale, setScale] = useState<string>('1')
    useEffect(() => {
        MicroApp.start({
            ssr: true,
        })
        win.addEventListener('resize', onDefer)
        resize()
        return () => {
            win.removeEventListener('resize', onDefer)
            clearTimeout(timeout);
        }
    }, [])
    const resize = () => {
        const html = document.documentElement;
        if (html.clientWidth >= 1440) {
            html.style.fontSize = `${(html.clientWidth / 1920).toFixed(5)}px`
            setScale((html.clientWidth / 1920).toFixed(5))
        }
    }
    const onDefer = () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            resize()
        }, 50)
    }
    return (<StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <Router basename='/'>
                    <RootRouter scale={scale} />
                </Router>
            </RecoilRoot>
        </QueryClientProvider >
    </StrictMode>)
}

export default App