/* eslint-disable react/prop-types */
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Card, Col, Row } from 'antd'

import LayoutMain from '../components/layout/LayoutMain'
import PRODUCT_QUERY from '../graphql/product-query.graphql'
import ProductCarousel from '../components/product/ProductCarousel'

import styles from './Pages.module.less'
import ProductDetails from '../components/product/ProductDetails'
import ProductReviewForm from '../components/product/ProductReviewForm'

const grid = {
  // prettier-ignore
  /* eslint-disable */
  carousel: { xs: 24, sm: 12, lg: 7 },
  details: { xs: 24, sm: 12, lg: 17 },
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
        <Col xs={{ offset: 1, span: 22 }} md={{ offset: 2, span: 20 }}>
          <Card>
            <Row gutter={32}>
              <Col {...grid.carousel}>
                <ProductCarousel product={data.product} />
              </Col>

              <Col {...grid.details}>
                <ProductDetails product={data.product} />
              </Col>
            </Row>
          </Card>
          <Row>
            <Col span={24}>
              <ProductReviewForm onSubmit={console.log} />
            </Col>
          </Row>
        </Col>
      </Row>
    </LayoutMain>
  )
}

export default Product
