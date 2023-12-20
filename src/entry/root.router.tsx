import { ConfigProvider } from 'antd'
import { FC, Suspense, lazy, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import microApp from '@micro-zoe/micro-app'
import { Routes, Route, Location, useLocation, useNavigate, NavigateFunction } from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import { RootProivder, RootState } from '@hook/root/atom'
import { LocaleData } from 'typings/module/local'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import zhHK from 'antd/locale/zh_HK'

const Loading = lazy(() => import('@/layout/welcome/loading'))
const Welcome = lazy(() => import('@page/welcome'))
const ErrorRouter = lazy(() => import('@page/error/error.router'))
const LhHost = lazy(() => import('@page/lh'))
const RegisterRouter = lazy(() => import('@page/register/register.router'))

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-hk'
import 'dayjs/locale/en'


const RootRouter: FC = () => {
    const config: LocaleData = {
        'zh-CN': zhCN,
        'en': enUS,
        'zh-HK': zhHK
    }
    const route: Location = useLocation()
    const history: NavigateFunction = useNavigate()
    const [state] = useRecoilState<RootState>(RootProivder)
    const [_, i18n] = useTranslation()
    useEffect(() => {
        if (route.pathname === '/') {
            history({ pathname: '/welcome' })
        }
    }, [])
     useEffect(() => {
        dayjs(state.locale)
        microApp.setGlobalData({...state})
        i18n.changeLanguage(state.locale)
    }, [state])
    return (<ConfigProvider locale={config[state.locale]}>
        <Routes>
            <Route path='/*'>
                <Route path='welcome' element={<Suspense fallback={<Loading />}>
                    <Welcome />
                </Suspense>} />
                <Route path='lh/*' element={<Suspense fallback={<Loading />}>
                    <LhHost />
                </Suspense>} />
                <Route path='register' element={<Suspense fallback={<Loading />}>
                    <RegisterRouter />
                </Suspense>} />
                <Route path='error' element={<Suspense fallback={<Loading />}>
                    <ErrorRouter />
                </Suspense>} />
            </Route>
        </Routes>
    </ConfigProvider>)
}

export default RootRouter