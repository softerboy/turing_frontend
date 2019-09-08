/* eslint-disable camelcase */
import React, { useContext, useState } from 'react'
import { Col, Row, Typography } from 'antd'

import { getPriceIncludingDiscounted } from '../../common/utils'
import { AppContext } from '../context/AppContext'
import ColorSelect from '../filter/ColorSelect'
import styles from './ProductGridItem.module.less'
import SizeSelect from '../filter/SizeSelect'
import AddToCartActionButton from '../cart/AddToCartActionButton'

const { Title } = Typography

/* eslint-disable react/prop-types */
const ProductGridItemHover = ({ className, product }) => {
  const { currency } = useContext(AppContext)
  const { name, product_id, colors, sizes } = product
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(null)

  const onColorChange = selectedColor => {
    setColor(selectedColor)
  }

  const onSizeChange = selectedSize => {
    setSize(selectedSize)
  }

  let attrs = null
  if (color && size) {
    attrs = `${color.value}, ${size.value}`
  }

  return (
    <div className={className}>
      <Row id={`card-hover-container-${product_id}`}>
        <Col>
          <Title level={4}>{name}</Title>
        </Col>

        <Col>
          <Title type="danger" level={3}>
            {currency}
            {getPriceIncludingDiscounted(product)}
          </Title>
        </Col>

        <Col className={styles.colorSelectContainer}>
          <ColorSelect
            colors={colors}
            onChange={onColorChange}
            defaultColorIds={color ? [color.color_id] : []}
          />
        </Col>

        <Col className={styles.sizeSelectContainer}>
          <SizeSelect
            sizes={sizes}
            onChange={onSizeChange}
            defaultSizeIds={size ? [size.size_id] : []}
          />
        </Col>

        <Col style={{ marginTop: 16 }}>
          <AddToCartActionButton product_id={product_id} attributes={attrs} />
        </Col>
      </Row>
    </div>
  )
}

export default ProductGridItemHover
