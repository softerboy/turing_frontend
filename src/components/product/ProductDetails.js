/* eslint-disable react/prop-types, camelcase */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumb, Button, Col, Row, Typography } from 'antd'

import PriceRenderer from './PriceRenderer'
import ColorSelect from '../filter/ColorSelect'
import SizeSelect from '../filter/SizeSelect'

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
        <ColorSelect colors={product.colors} />
      </Col>

      <Col span={24} style={style.spacer}>
        <Title type="secondary" level={4}>
          {t('Size')}
        </Title>
        <SizeSelect sizes={product.sizes} />
      </Col>

      <Col span={24} style={style.spacer}>
        <Button type="primary" icon="shopping-cart" shape="round" size="large">
          {t('Add to cart')}
        </Button>
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
