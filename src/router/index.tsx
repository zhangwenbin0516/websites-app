import { FC, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from '../layout/welcome/loading'
const RootRouter: FC = () => {
  return (<Routes>
    <Route path='/' element={<Loading />} />
  </Routes>)
}

export default RootRouter