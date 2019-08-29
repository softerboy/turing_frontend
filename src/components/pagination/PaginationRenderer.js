/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import * as PropTypes from 'prop-types'

import ProductPagination from './ProductPagination'
import {
  paginationPropsFromQueryString,
  mergePaginationParamsToQueryString,
} from '../../common/utils'
import state from '../../local-state'

const PaginationRenderer = ({ history, total }) => {
  const [params, setParams] = useState({})

  useEffect(() => {
    setParams(paginationPropsFromQueryString(history.location.search))
  }, [history.location.search])

  const handlePaginationChange = paginationParams => {
    const queryString = mergePaginationParamsToQueryString(
      paginationParams,
      history.location.search,
    )
    history.push(`/products?${queryString}`)
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ProductPagination
      current={params.page}
      pageSize={params.per_page}
      sort={params.sort}
      total={total}
      sortOptions={state.productSortOptions}
      onParamsChange={handlePaginationChange}
    />
  )
}

export default withRouter(PaginationRenderer)

PaginationRenderer.propTypes = {
  total: PropTypes.number,
}

PaginationRenderer.defaultProps = {
  total: 0,
}
