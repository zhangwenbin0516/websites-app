import { FC, Fragment } from 'react'

const HomeComponent: FC = () => {
    return(<Fragment>
        <micro-app name="lh-host" url="http://localhost:36310/" ssr baseroute="/lh"></micro-app>
    </Fragment>)
}

export default HomeComponent