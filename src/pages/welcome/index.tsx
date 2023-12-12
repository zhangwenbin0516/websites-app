import {FC, useEffect} from 'react'
import WelcomePage from '../../layout/welcome'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import style from './welcome.module.scss'
import lhLogo from '@assets/lh/lh-logo.png'
import allkicLogo from '@assets/lh/lh-logo.png'

const Welcome:FC = function () {
    const history: NavigateFunction = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            history({pathname: '/lh'})
        }, 3000)
    }, [])
    return(<Link to={'/lh'} className={style.rel}>
        <div className={style.logo}>
            <img className={style.lh} src={lhLogo} />
        </div>
        <WelcomePage />
    </Link>)
}

export default Welcome