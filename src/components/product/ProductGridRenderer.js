import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import * as PropTypes from 'prop-types'

import ProductGrid from './ProductGrid'
import PRODUCTS_QUERY from '../../graphql/products-query.graphql'

// eslint-disable-next-line react/prop-types
const ProductGridRenderer = ({ onTotalChanged, variables }) => {
  const { data, error, loading } = useQuery(PRODUCTS_QUERY, { variables })

  // TODO: replace with loading component
  if (loading) return <div>Loading</div>

  // TODO:
  //  handle error
  //  replace with error placeholder
  if (error) return <div>Ops ;-)</div>

  const {
    products: {
      data: products,
      metadata: { totalItems },
    },
  } = data

  // notify total changed
  onTotalChanged(totalItems)

  return <ProductGrid products={products} />
}

export default withRouter(ProductGridRenderer)

ProductGridRenderer.propTypes = {
  onTotalChanged: PropTypes.func,
}

ProductGridRenderer.defaultProps = {
  onTotalChanged: () => {}, // noop
}
