/* eslint-disable react/prop-types */
import React from 'react'
import { Query } from 'react-apollo'

import ME_QUERY from '../graphql/me-query.graphql'

// renders loader placeholder component
// during application boots
const Boot = ({ children }) => {
  const renderProp = ({ data, loading, error, client }) => {
    if (error) return children

    // TODO: replace with full page loader
    if (loading) return null

    const { me } = data
    client.cache.writeData({ data: { auth: me } })

    return children
  }

  return <Query query={ME_QUERY}>{renderProp}</Query>
}

export default Boot
