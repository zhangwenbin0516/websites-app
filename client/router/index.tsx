import { FC, useContext, useEffect, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import APPContext from '@/store'
import { StateProps } from '@/store/state'
import ErrorComponent from '@element/error/404'

export const RouteComponent: FC = () => {
  const { state } = useContext<{dispatch: void, state: StateProps}>(APPContext)
  const { routes = [], locale, errors = [] } = state
  useEffect(() => {
    console.log(state, 'ppppppp')
  })
  return(<ConfigProvider locale={locale}>
    <BrowserRouter>
      <Routes>
        {
          routes.map((item, index: number) => {
            return(<Suspense fallback={<ErrorComponent errors={errors} />}>
              <Route key={ index } />
            </Suspense>)
          })
        }
      </Routes>
    </BrowserRouter>
  </ConfigProvider>)
}