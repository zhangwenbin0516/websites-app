import { RootProivder, RootState } from '@/hooks/root/atom'
import { setStorage } from '@/hooks/storage'
import microApp from '@micro-zoe/micro-app'
import { FC, Fragment, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import axios from 'axios'

const HomeComponent: FC = () => {
    const [state, setState] = useRecoilState<RootState>(RootProivder)
    let resN: number = 0
    let errN: number = 0
    const postMessage = (data: any) => {
        const config =  {
            ...state,
            ...data
        }
        setState(config)
        setStorage('config', config)
    }
    useEffect(() => {
        microApp.addDataListener('lh-host', postMessage)
        return () => {
            microApp.removeDataListener('lh-host', postMessage)
        }
    }, [])
    return(<Fragment>
        <micro-app 
        name="lh-host" 
        url="http://localhost:36310" 
        onDataChange={(e: any) => console.log('来自子应用的数据：', e.detail.data)}
        ssr baseroute="/lh"></micro-app>
    </Fragment>)
}

export default HomeComponent