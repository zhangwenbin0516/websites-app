import {FC, useEffect} from 'react'
import WelcomePage from '../../layout/welcome'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'

const Welcome:FC = function () {
    const history: NavigateFunction = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            history({pathname: '/lh'})
        }, 3000)
    }, [])
    return(<Link to={'/lh'}>
        <WelcomePage />
    </Link>)
}

export default Welcome