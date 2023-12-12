import MicroApp from '@micro-zoe/micro-app'
import { FC, StrictMode, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router } from 'react-router-dom'
import RootRouter from './root.router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
const App: FC = () => {

    useEffect(() => {
        MicroApp.start({
            ssr: true
        })
    }, [])

    return (<StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <Router basename='/'>
                    <RootRouter />
                </Router>
            </RecoilRoot>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider >
    </StrictMode>)
}

export default App