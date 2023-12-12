import MicroApp from '@micro-zoe/micro-app'
import { FC, StrictMode, useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import RootRouter from './root.router'
import { RootProivder, RootState } from '../hooks/root/atom'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import zhHK from 'antd/locale/zh_HK'

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-hk'
import 'dayjs/locale/en'
import { LocaleData } from 'typings/module/local'

const App: FC = () => {
    const config: LocaleData = {
        'zh-cn': zhCN,
        'en': enUS,
        'zh-hk': zhHK
    }
    const [state] = useRecoilState<RootState>(RootProivder)
    useEffect(() => {
        MicroApp.start({
            ssr: true
        })
    }, [])
    useEffect(() => {
        dayjs(state.locale)
    }, [state])
    return (<StrictMode>
        <RecoilRoot>
            <ConfigProvider locale={config[state.locale]}>
                <Router basename='/'>
                    <RootRouter />
                </Router>
            </ConfigProvider>
        </RecoilRoot>
    </StrictMode>)
}

export default App