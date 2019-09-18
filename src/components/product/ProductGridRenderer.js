import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import * as PropTypes from 'prop-types'

import ProductGrid from './ProductGrid'
import PRODUCTS_QUERY from '../../graphql/products-query.graphql'
import EmptySearchPlaceholder from './EmptySearchPlaceholder'
import { searchTermFromQueryString } from '../../common/utils'

// eslint-disable-next-line react/prop-types
const ProductGridRenderer = ({ onTotalChanged, variables, history }) => {
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

  // eslint-disable-next-line react/prop-types
  const search = searchTermFromQueryString(history.location.search)

  if (totalItems === 0 && search && search.length)
    return <EmptySearchPlaceholder term={search} />

  return <ProductGrid products={products} />
}

export default withRouter(ProductGridRenderer)

ProductGridRenderer.propTypes = {
  onTotalChanged: PropTypes.func,
}

ProductGridRenderer.defaultProps = {
  onTotalChanged: () => {}, // noop
}
