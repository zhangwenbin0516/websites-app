import React, {FC, useEffect} from 'react'
import WelcomePage from '../../layout/welcome'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import style from './welcome.module.scss'
import { useRecoilState } from 'recoil'
import { RootProivder, RootState } from '../../hooks/root/atom'
import { Dropdown } from 'antd'
import { LocaleData } from '../../hooks/root/data'

const Welcome:FC = function () {
    const history: NavigateFunction = useNavigate()
    const [state, setState] = useRecoilState<RootState>(RootProivder)
    useEffect(() => {
        setTimeout(() => {
            // history({pathname: '/lh'})
        }, 3000)
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
                    console.log(item)
                    setState({
                        locale: e.key,
                        localeText: item?.label
                    })
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