import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

/* eslint-disable react/prop-types */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AppContext)

  const renderProp = props => {
    if (auth) {
      return <Component {...props} />
    }

    const { location } = props
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    )
  }

  return <Route {...rest} render={renderProp} />
}

export default PrivateRoute
