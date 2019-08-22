import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Home from './pages/Home'
// eslint-disable-next-line
import Auth from './pages/Auth'
import PrivateRoute from './components/auth/PrivateRoute'
import AppProvider from './components/context/AppContext'
import data from './local-state'
import resolvers from './resolvers'
import Boot from './components/Boot'
import { USER_KEY } from './common/constants'

const cache = new InMemoryCache()
cache.writeData({ data })

const request = async operation => {
  const token = localStorage.getItem(USER_KEY)
  operation.setContext({
    headers: { [USER_KEY]: token ? `Bearer ${token}` : '' },
  })
}

const client = new ApolloClient({
  cache,
  resolvers,
  request,
})

const App = () => (
  <ApolloProvider client={client}>
    <Boot>
      <AppProvider>
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
            <PrivateRoute
              exact
              path="/secret"
              component={() => <h1>Secret</h1>}
            />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </Boot>
  </ApolloProvider>
)

export default App
