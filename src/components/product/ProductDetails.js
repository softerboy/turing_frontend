/* eslint-disable react/prop-types, camelcase */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumb, Col, Row, Typography } from 'antd'

import PriceRenderer from './PriceRenderer'
import ColorSelect from '../filter/ColorSelect'
import SizeSelect from '../filter/SizeSelect'
import AddToCartActionButton from '../cart/AddToCartActionButton'

const { Text, Title, Paragraph } = Typography

const style = {
  spacer: {
    marginTop: 24,
  },
}

function renderCategories(categories) {
  const { length } = categories
  return categories.map((category, index) => {
    const isLastCategory = index === length - 1
    return (
      <Text key={category.category_id}>
        {category.name} {isLastCategory ? '' : <span> &middot; </span>}
      </Text>
    )
  })
}

// eslint-disable-next-line react/prop-types
const ProductDetails = ({ product }) => {
  const { t } = useTranslation()
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(null)

  const onColorChange = selectedColor => setColor(selectedColor)
  const onSizeChange = selectedSize => setSize(selectedSize)

  let attrs = null
  if (color && size) {
    attrs = `${color.value}, ${size.value}`
  }

  return (
    <Row>
      <Col>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            {renderCategories(product.categories)}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>

      <Col span={24} style={style.spacer}>
        <Title level={2}>{product.name}</Title>
      </Col>

      <Col span={24}>
        <PriceRenderer
          price={product.price}
          discountedPrice={product.discounted_price}
        />
      </Col>

      <Col span={24} style={style.spacer}>
        <Title type="secondary" level={4}>
          {t('Color')}
        </Title>
        <ColorSelect
          colors={product.colors}
          defaultColorIds={color ? [color.color_id] : []}
          onChange={onColorChange}
        />
      </Col>

      <Col span={24} style={style.spacer}>
        <Title type="secondary" level={4}>
          {t('Size')}
        </Title>
        <SizeSelect
          sizes={product.sizes}
          defaultSizeIds={size ? [size.size_id] : []}
          onChange={onSizeChange}
        />
      </Col>

      <Col span={24} style={style.spacer}>
        <AddToCartActionButton
          product_id={product.product_id}
          attributes={attrs}
        />
      </Col>

      <Col span={24} style={style.spacer}>
        <Title type="secondary" level={4}>
          {t('Description')}
        </Title>
        <Paragraph>
          {product.description}
          {product.categories.map(({ description, category_id }) => (
            <div key={category_id}>
              <br />
              {description}
            </div>
          ))}
        </Paragraph>
      </Col>
    </Row>
  )
}

export default ProductDetails
