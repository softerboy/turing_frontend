import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import APP_CONTEXT_QUERY from '../../graphql/app-context-query.graphql'

export const AppContext = React.createContext(null)
const { Provider } = AppContext

// eslint-disable-next-line
const AppProvider = ({ children }) => {
  const { data } = useQuery(APP_CONTEXT_QUERY)

  const { auth } = data
  const isLoggedIn = Boolean(auth && auth.accessToken)

  const value = {
    ...data,
    isLoggedIn,
  }

  return <Provider value={value}>{children}</Provider>
}

export default AppProvider
