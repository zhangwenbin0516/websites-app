import React, {FC, useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { Dropdown } from 'antd'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import WelcomePage from '@/layout/welcome'
import { RootProivder, RootState } from '@hook/root/atom'
import { LocaleData } from '@hook/root/data'
import { setStorage } from '@/hooks/storage'

import style from './welcome.module.scss'




const Welcome:FC = function () {
    const history: NavigateFunction = useNavigate()
    const [state, setState] = useRecoilState<RootState>(RootProivder)
    let timeout: NodeJS.Timeout|number = 0
    useEffect(() => {
        timeout = setTimeout(() => {
            history({pathname: '/lh'})
        }, 3000)
        return () => {
            clearTimeout(timeout)
        }
    }, [])
    const onStop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
    }
    return(<div className={style.rel}>
        <div className={`${state.locale === 'en' ? style.en : style.logo}`}></div>
        <Dropdown
            menu={{
                items: LocaleData,
                defaultSelectedKeys: [state.locale],
                selectable: true,
                onClick: (e) => {
                    const item = LocaleData.find(key => key.key === e.key)
                    const config = {
                        ...state,
                        locale: e.key,
                        localeText: item?.label
                    }
                    setState(config)
                    setStorage('config', config)
                    e.domEvent.stopPropagation()
                    e.domEvent.preventDefault()
                }
            }}
            trigger={['hover']}
            className={style.locale}>
                <div onClick={(e) => onStop(e)} className={style.locale_col}>{state.localeText}</div>
            </Dropdown>
        <WelcomePage />
    </div>)
}

export default Welcome