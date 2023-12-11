import { FC, Fragment, Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Location, useLocation, useNavigate, NavigateFunction, Outlet } from 'react-router-dom'

const Loading = lazy(() => import('../layout/welcome/loading'))
const Welcome = lazy(() => import('../pages/welcome'))
const ErrorRouter = lazy(() => import('../pages/error/error.router'))
const LhRouter = lazy(() => import('../pages/lh/lh.router'))
const RegisterRouter = lazy(() => import('../pages/register/register.router'))

const RootRouter: FC = () => {
    const route: Location = useLocation()
    const history: NavigateFunction = useNavigate()
    useEffect(() => {
        if (route.pathname === '/') {
            history({ pathname: '/welcome' })
        }
    }, [])
    return (<Fragment>
        <Routes>
            <Route path='/*'>
                <Route path='welcome' element={<Suspense fallback={<Loading />}>
                    <Welcome />
                </Suspense>} />
                <Route path='lh' element={<Suspense fallback={<Loading />}>
                    <ErrorRouter />
                </Suspense>} />
                <Route path='register' element={<Suspense fallback={<Loading />}>
                    <LhRouter />
                </Suspense>} />
                <Route path='error' element={<Suspense fallback={<Loading />}>
                    <RegisterRouter />
                </Suspense>} />
            </Route>
        </Routes>
    </Fragment>)
}

export default RootRouter