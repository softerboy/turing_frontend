import React from 'react'

export const AppContext = React.createContext(null)
const { Provider } = AppContext

const initialValue = {
  auth: null,
}

// eslint-disable-next-line
const AppProvider = ({ children }) => (
  <Provider value={initialValue}>{children}</Provider>
)

export default AppProvider
