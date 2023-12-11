import { FC } from 'react'
import Loading from './loading'
import style from './welcome.module.scss'

const Welcome: FC = () => {
  return (<div className={`${style.bg}`}>
    <Loading />
    <div className={style.footer}></div>
  </div>);
}

export default Welcome;
