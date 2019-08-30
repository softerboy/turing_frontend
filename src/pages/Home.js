/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'

import LayoutMain from '../components/layout/LayoutMain'
import FilterRenderer from '../components/filter/FilterRenderer'
import PaginationRenderer from '../components/pagination/PaginationRenderer'
import ProductGridRenderer from '../components/product/ProductGridRenderer'
import {
  filterPropsFromQueryString,
  paginationPropsFromQueryString,
} from '../common/utils'

const colWidth = {
  // prettier-ignore
  filter:   { xs:  0, sm:  0, md:  0, lg: 6,  xl: 6,  xxl: 4 },
  products: { xs: 24, sm: 24, md: 24, lg: 18, xl: 18, xxl: 20 },
}

/* eslint-disable react/prop-types */
const Home = ({ history }) => {
  const [total, setTotal] = useState(0)
  const [variables, setVariables] = useState({ page: 1, perPage: 10 })

  useEffect(() => {
    const { search } = history.location
    const {
      defaultCategoryIds: inCategory,
      defaultColorIds: inColor,
      defaultSizeIds: inSize,
      defaultPrice: inPrice,
    } = filterPropsFromQueryString(search)

    const {
      page,
      per_page: perPage,
      sort: sortBy,
    } = paginationPropsFromQueryString(search)

    const newVariables = {
      inCategory,
      inColor,
      inSize,
      inPrice,
      page,
      perPage,
      sortBy,
    }

    setVariables(newVariables)
    // eslint-disable-next-line
  }, [history.location.search])

  return (
    <LayoutMain>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col style={{ marginBottom: 16 }}>
          <PaginationRenderer total={total} />
        </Col>

        <Col {...colWidth.filter}>
          <FilterRenderer />
        </Col>

        <Col {...colWidth.products}>
          <ProductGridRenderer
            onTotalChanged={setTotal}
            variables={variables}
          />
        </Col>
      </Row>
    </LayoutMain>
  )
}

export default Home
