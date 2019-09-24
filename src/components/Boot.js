import { useQuery } from '@apollo/react-hooks'
import React, { useEffect } from 'react'

import ME_QUERY from '../graphql/me-query.graphql'
import CART_QUERY from '../graphql/cart-query.graphql'
import { getCartId } from '../common/utils'
import FullPageLoader from './FullPageLoader'

// renders loader placeholder component
// during application boots
const Boot = ({ children }) => {
  const { data, loading, error, client } = useQuery(ME_QUERY)

  useEffect(() => {
    // eslint-disable-next-line camelcase
    getCartId(client).then(async cart_id => {
      // prettier-ignore
      const { data: { cart, totalAmount } } = await client.query({
        query: CART_QUERY,
        variables: { cart_id },
      })

      client.writeData({
        data: { cartInfo: cart, cartTotalAmount: totalAmount },
      })
    })
  }, [client])

  if (error) return children

  if (loading) return <FullPageLoader />

  const { me } = data
  client.cache.writeData({ data: { auth: me } })

  return children
}

export default Boot
