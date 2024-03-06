import { FC, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'


import Loading from '@/layout/welcome/loading'
const Welcome = lazy(() => import('@page/welcome'))
const ErrorRouter = lazy(() => import('@page/error/error.router'))
const LhHost = lazy(() => import('@page/lh'))
const RegisterRouter = lazy(() => import('@page/register/register.router'))

const PageRouter: FC = () => {

  return (<Routes>
    <Route path='welcome' element={<Suspense fallback={<Loading />}>
      <Welcome />
    </Suspense>} />
    <Route path='lh/*' element={<Suspense fallback={<Loading />}>
      <LhHost />
    </Suspense>} />
    <Route path='register' element={<Suspense fallback={<Loading />}>
      <RegisterRouter />
    </Suspense>} />
    <Route path='error' element={<Suspense fallback={<Loading />}>
      <ErrorRouter />
    </Suspense>} />
  </Routes>)
}

export default PageRouter