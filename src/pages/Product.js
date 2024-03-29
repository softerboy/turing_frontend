/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Card, Col, Row } from 'antd'

import LayoutMain from '../components/layout/LayoutMain'
import PRODUCT_QUERY from '../graphql/product-query.graphql'
import ProductCarousel from '../components/product/ProductCarousel'

import styles from './Pages.module.less'
import ProductDetails from '../components/product/ProductDetails'
import ReviewFormRenderer from '../components/product/review/ReviewFormRenderer'
import ReviewListRenderer from '../components/product/review/ReviewListRenderer'
import ProductDetailsPlaceholder from '../components/product/ProductDetailsPlaceholder'
import ErrorRenderer from '../components/ErrorRenderer'

const grid = {
  // prettier-ignore
  /* eslint-disable */
  carousel: { xs: 24, sm: 12, lg: 7 },
  details: { xs: 24, sm: 12, lg: 17 },
}

const Product = ({ match }) => {
  const product_id = Number(match.params.product_id)
  const reviewListRef = useRef(null)

  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: { product_id },
  })

  if (loading)
    return (
      <LayoutMain>
        <Row className={styles.product}>
          <Col xs={{ offset: 1, span: 22 }} md={{ offset: 2, span: 20 }}>
            <Card>
              <ProductDetailsPlaceholder />
            </Card>
          </Col>
        </Row>
      </LayoutMain>
    )

  if (error) {
    return (
      <LayoutMain>
        <ErrorRenderer error={error} />
      </LayoutMain>
    )
  }

  const pushReview = review => reviewListRef.current.pushReview(review)

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
              <ReviewFormRenderer onReviewAdded={pushReview} />
            </Col>
            <Col span={24}>
              <ReviewListRenderer ref={reviewListRef} product_id={product_id} />
            </Col>
          </Row>
        </Col>
      </Row>
    </LayoutMain>
  )
}

export default Product
