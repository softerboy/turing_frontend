import { useQuery } from '@apollo/react-hooks'

import ME_QUERY from '../graphql/me-query.graphql'

// renders loader placeholder component
// during application boots
const Boot = ({ children }) => {
  const { data, loading, error, client } = useQuery(ME_QUERY)

  if (error) return children

  // TODO: replace with full page loader
  if (loading) return null

  const { me } = data
  client.cache.writeData({ data: { auth: me } })

  return children
}

export default Boot
