import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        name="home"
        path={['/', '/home', '/index']}
        component={Home}
      />
      <Route exact name="login" path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
)

export default App
