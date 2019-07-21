import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        name="home"
        path={['/', '/home', '/index']}
        component={Home}
      />
      {/*
        The role of key prop is clear (i.e. rerender)
        login ind register form fields in every page transition.
        Without it forms same fields value keeps their
        value between page transition
      */}
      <Route exact name="login" path="/login">
        <Auth key="login" />
      </Route>
      <Route exact name="register" path="/register">
        <Auth key="register" register />
      </Route>
    </Switch>
  </BrowserRouter>
)

export default App
