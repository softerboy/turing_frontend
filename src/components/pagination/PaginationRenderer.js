/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import ProductPagination from './ProductPagination'
import { paginationPropsFromQueryString } from '../../common/utils'
import state from '../../local-state'

const PaginationRenderer = ({ history }) => {
  const [params, setParams] = useState({})

  useEffect(() => {
    setParams(paginationPropsFromQueryString(history.location.search))
  }, [history.location.search])

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ProductPagination
      current={params.page}
      pageSize={params.per_page}
      sort={params.sort}
      total={101}
      sortOptions={state.productSortOptions}
    />
  )
}

export default withRouter(PaginationRenderer)
