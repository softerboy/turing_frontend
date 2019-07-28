import React from 'react'
import { Query } from 'react-apollo'

import APP_CONTEXT_QUERY from '../../graphql/app-context-query.graphql'

export const AppContext = React.createContext(null)
const { Provider } = AppContext

// eslint-disable-next-line
const AppProvider = ({ children }) => {
  /* eslint-disable react/prop-types */
  const renderProp = ({ data }) => {
    const { auth } = data
    const isLoggedIn = Boolean(auth && auth.accessToken)

    const value = {
      ...data,
      isLoggedIn,
    }

    return <Provider value={value}>{children}</Provider>
  }

  return <Query query={APP_CONTEXT_QUERY}>{renderProp}</Query>
}

export default AppProvider
