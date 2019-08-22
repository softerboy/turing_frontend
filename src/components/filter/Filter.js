/* eslint-disable react/jsx-props-no-spreading, react/prop-types, react/destructuring-assignment */
import React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import PriceSelect from './PriceSelect'
import CategorySelect from './CategorySelect'
import ColorSelect from './ColorSelect'
import SizeSelect from './SizeSelect'

const { Text } = Typography

const wrapWithTitle = (Component, title, props) => {
  return (
    <Row style={{ marginBottom: 16 }}>
      <Col style={{ marginBottom: 12 }}>
        <Text strong style={{ fontSize: '1.1em' }}>
          {title}
        </Text>
      </Col>
      <Col>
        <Component {...props} />
      </Col>
    </Row>
  )
}

const Filter = props => {
  const { t } = useTranslation()

  const categoryProps = {
    categories: props.categories,
    defaultCategoryIds: props.defaultCategoryIds,
  }

  const colorProps = {
    colors: props.colors,
    defaultColorIds: props.defaultColorIds,
    multiple: true,
  }

  const sizeProps = {
    sizes: props.sizes,
    defaultSizeIds: props.defaultSizeIds,
    multiple: true,
  }

  const priceProps = {
    ...props.price,
    defaultPrice: props.defaultPrice,
  }

  return (
    <Card title="Filter">
      {wrapWithTitle(CategorySelect, t('Category'), categoryProps)}
      {wrapWithTitle(ColorSelect, t('Color'), colorProps)}
      {wrapWithTitle(SizeSelect, t('Size'), sizeProps)}
      {wrapWithTitle(PriceSelect, t('Price'), priceProps)}
    </Card>
  )
}

export default Filter
