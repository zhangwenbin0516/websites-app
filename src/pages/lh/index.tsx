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
    const getFetch = (val: string) => {
        axios.get("http://localhost:8001/code/code", {
            timeout: 5000
        }).then(res => {
            console.log(res, val, "success", resN++)
        }).catch(err => {
            console.log(err, val, "err", errN++)
        })
    }
    const FN = (n: number) => {
        for(let i=0; i<300; i++) {
            getFetch(i + '-1')
        }
        if (n < 10) {
            setTimeout(() => {
                FN(n+1)
                
            }, 100)
        }
    }
    useEffect(() => {
        microApp.addDataListener('lh-host', postMessage)
        FN(0)
        return () => {
            microApp.removeDataListener('lh-host', postMessage)
        }
    }, [])
    return(<Fragment>
        <micro-app 
        name="lh-host" 
        url="http://gw.allkic.cn/" 
        onDataChange={(e: any) => console.log('来自子应用的数据：', e.detail.data)}
        ssr baseroute="/lh"></micro-app>
    </Fragment>)
}

export default HomeComponent