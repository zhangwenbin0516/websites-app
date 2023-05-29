import { FC } from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App: FC = (props: any) => {
  console.log(props)
  return (<StaticRouter location={props.url}>
    <Routes>
      <Route element={<div>asdasdasd</div>} path='/' />
    </Routes>
  </StaticRouter>)
}

export default App
