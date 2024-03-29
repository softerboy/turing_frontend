import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// eslint-disable-next-line
import PrivateRoute from './components/auth/PrivateRoute'
import AppProvider from './components/context/AppContext'
import data from './local-state'
import resolvers from './resolvers'
import Boot from './components/Boot'
import { USER_KEY } from './common/constants'
import {
  Auth,
  Checkout,
  NotFound,
  ThankYou,
  Product,
  Home,
  // eslint-disable-next-line import/named
} from './pages/Index'
import ScrollToTop from './components/ScrollToTop'

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
          <ScrollToTop>
            <Switch>
              <Route
                exact
                name="home"
                path={['/', '/home', '/index', '/products']}
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
              <PrivateRoute exact path="/checkout" component={Checkout} />
              <Route exact path="/product/:product_id" component={Product} />
              <Route exact path="/thankyou" component={ThankYou} />
              <Route path={['/404', '*']} component={NotFound} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </AppProvider>
    </Boot>
  </ApolloProvider>
)

export default App
