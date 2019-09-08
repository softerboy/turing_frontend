import { useQuery } from '@apollo/react-hooks'
import { useEffect } from 'react'

import ME_QUERY from '../graphql/me-query.graphql'
import CART_QUERY from '../graphql/cart-query.graphql'
import { getCartId } from '../common/utils'

// renders loader placeholder component
// during application boots
const Boot = ({ children }) => {
  const { data, loading, error, client } = useQuery(ME_QUERY)

  useEffect(() => {
    // eslint-disable-next-line camelcase
    getCartId(client).then(async cart_id => {
      // prettier-ignore
      const { data: { cart } } = await client.query({
        query: CART_QUERY,
        variables: { cart_id },
      })

      client.writeData({ data: { cartInfo: cart } })
    })
  }, [client])

  if (error) return children

  // TODO: replace with full page loader
  if (loading) return null

  const { me } = data
  client.cache.writeData({ data: { auth: me } })

  return children
}

export default Boot
