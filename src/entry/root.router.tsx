import { ConfigProvider } from 'antd'
import { FC, Suspense, lazy, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import microApp from '@micro-zoe/micro-app'
import { Routes, Route, Location, useLocation, useNavigate, NavigateFunction, Outlet } from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import { RootProivder, RootState } from '@hook/root/atom'
import { LocaleData } from 'typings/module/local'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import zhHK from 'antd/locale/zh_HK'
import { setStorage, getStorage } from '@/hooks/storage'

import Loading from '@/layout/welcome/loading'
const PageRouter = lazy(() => import('@page/page.router'))

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-hk'
import 'dayjs/locale/en'


interface IProps {
    scale: string
}
const RootRouter: FC<IProps> = ({scale}) => {
    const config: LocaleData = {
        'zh-CN': zhCN,
        'en': enUS,
        'zh-HK': zhHK
    }
    const route: Location = useLocation()
    const history: NavigateFunction = useNavigate()
    const [state, setState] = useRecoilState<RootState>(RootProivder)
    const [_, i18n] = useTranslation()
    useEffect(() => {
        if (route.pathname === '/') {
            history({ pathname: '/welcome' })
        }
    }, [])
     useEffect(() => {
        dayjs(state.locale)
        const configs = getStorage('config')
        const config = {...state, ...configs}
        microApp.setGlobalData(config)
        i18n.changeLanguage(config.locale)
    }, [state])
    useEffect(() => {
        const configs = getStorage('config')
        const config = {
            ...state,
            ...configs,
            scale: scale
        }
        setState(config)
        setStorage('config', config)
    }, [scale])
    return (<ConfigProvider locale={config[state.locale]}>
        <Routes>
            <Route path='/*' element={<Suspense fallback={<Loading />}>
                <PageRouter />
                <Outlet />
            </Suspense>} />
        </Routes>
        <Outlet />
    </ConfigProvider>)
}

export default RootRouter