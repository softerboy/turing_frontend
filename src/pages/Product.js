/* eslint-disable react/prop-types */
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Col, Row } from 'antd'

import LayoutMain from '../components/layout/LayoutMain'
import PRODUCT_QUERY from '../graphql/product-query.graphql'
import ProductCarousel from '../components/product/ProductCarousel'

import styles from './Pages.module.less'

const grid = {
  // prettier-ignore
  /* eslint-disable */
  carousel: { xs: 24, sm: 12, lg: 7 }
}

const Product = ({ match }) => {
  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: {
      product_id: Number(match.params.productId),
    },
  })

  if (loading) return <div>Loading</div>

  if (error) return <div>Ops ;-)</div>

  return (
    <LayoutMain>
      <Row className={styles.product}>
        <Col xs={{ offset: 1, span: 22 }} md={{offset: 2, span: 20}}>
          <Row>
            <Col {...grid.carousel}>
              <ProductCarousel product={data.product} />
            </Col>
          </Row>
        </Col>
      </Row>
    </LayoutMain>
  )
}

export default Product
