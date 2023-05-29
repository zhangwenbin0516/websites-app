import { FC, Suspense } from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App: FC = (props: any) => {
  console.log(props)
  return (<StaticRouter location={props.url}>
    <Suspense>
    <Routes>
      <Route element={<div>asdasdasd</div>} path='/' />
    </Routes>
    </Suspense>
    
  </StaticRouter>)
}

export default App
