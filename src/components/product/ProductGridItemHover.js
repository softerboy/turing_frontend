/* eslint-disable camelcase */
import React, { useContext } from 'react'
import { Button, Col, Row, Typography } from 'antd'

import { getPriceIncludingDiscounted } from '../../common/utils'
import { AppContext } from '../context/AppContext'
import ColorSelect from '../filter/ColorSelect'
import styles from './ProductGridItem.module.less'
import SizeSelect from '../filter/SizeSelect'

const { Title } = Typography

/* eslint-disable react/prop-types */
const ProductGridItemHover = ({ className, product }) => {
  const { currency } = useContext(AppContext)

  return (
    <div className={className}>
      <Row id={`card-hover-container-${product.product_id}`}>
        <Col>
          <Title level={4}>{product.name}</Title>
        </Col>

        <Col>
          <Title type="danger" level={3}>
            {currency}
            {getPriceIncludingDiscounted(product)}
          </Title>
        </Col>

        <Col className={styles.colorSelectContainer}>
          <ColorSelect colors={product.colors} />
        </Col>

        <Col className={styles.sizeSelectContainer}>
          <SizeSelect sizes={product.sizes} />
        </Col>

        <Col style={{ marginTop: 16 }}>
          <Button icon="shopping-cart" shape="round" type="primary">
            Add To Card
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default ProductGridItemHover
