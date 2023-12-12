import { ConfigProvider } from 'antd'
import { FC, Suspense, lazy, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Routes, Route, Location, useLocation, useNavigate, NavigateFunction } from 'react-router-dom'

import { RootProivder, RootState } from '../hooks/root/atom'
import { LocaleData } from 'typings/module/local'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import zhHK from 'antd/locale/zh_HK'

const Loading = lazy(() => import('../layout/welcome/loading'))
const Welcome = lazy(() => import('../pages/welcome'))
const ErrorRouter = lazy(() => import('../pages/error/error.router'))
const LhRouter = lazy(() => import('../pages/lh/lh.router'))
const RegisterRouter = lazy(() => import('../pages/register/register.router'))

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-hk'
import 'dayjs/locale/en'

const RootRouter: FC = () => {
    const config: LocaleData = {
        'zh-cn': zhCN,
        'en': enUS,
        'zh-hk': zhHK
    }
    const route: Location = useLocation()
    const history: NavigateFunction = useNavigate()
    const [state] = useRecoilState<RootState>(RootProivder)
    useEffect(() => {
        if (route.pathname === '/') {
            history({ pathname: '/welcome' })
        }
    }, [])
     useEffect(() => {
        dayjs(state.locale)
    }, [state])
    return (<ConfigProvider locale={config[state.locale]}>
        <Routes>
            <Route path='/*'>
                <Route path='welcome' element={<Suspense fallback={<Loading />}>
                    <Welcome />
                </Suspense>} />
                <Route path='lh' element={<Suspense fallback={<Loading />}>
                    <ErrorRouter />
                </Suspense>} />
                <Route path='register' element={<Suspense fallback={<Loading />}>
                    <LhRouter />
                </Suspense>} />
                <Route path='error' element={<Suspense fallback={<Loading />}>
                    <RegisterRouter />
                </Suspense>} />
            </Route>
        </Routes>
    </ConfigProvider>)
}

export default RootRouter