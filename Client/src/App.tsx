
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import RoutesWithNotFound from './utils/routesWithNotFound.utility'
import { Home } from './pages/home'
import { PublicRoutes } from './models/routes'
import { Jedis } from './pages/jedis'

function App() {

  return (
    <>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path='/' element={<Home />} />
          <Route path={PublicRoutes.JEDIS} element={<Jedis />} />

        </RoutesWithNotFound>
      </BrowserRouter>
    </>
  )
}

export default App
