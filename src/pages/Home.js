/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Col, Row } from 'antd'

import LayoutMain from '../components/layout/LayoutMain'
import FilterRenderer from '../components/filter/FilterRenderer'
import Index from '../components/pagination/Index'

const colWidth = {
  filter: {
    xs: 24,
    sm: 12,
    md: 10,
    lg: 8,
    xl: 6,
    xxl: 4,
  },
  products: {
    xs: 24,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
  },
}

const Home = () => (
  <LayoutMain>
    <Row gutter={16} style={{ marginTop: 24 }}>
      <Col>
        <Index />
      </Col>

      <br />

      <Col {...colWidth.filter}>
        <FilterRenderer />
      </Col>

      <Col {...colWidth.products}>
        {/* prettier-ignore */}
        {/* render product list here */}
      </Col>
    </Row>
  </LayoutMain>
)

export default Home
