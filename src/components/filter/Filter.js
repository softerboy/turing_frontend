/* eslint-disable react/jsx-props-no-spreading, react/prop-types, react/destructuring-assignment */
import React, { useRef } from 'react'
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

  const categorySelectRef = useRef(null)
  const colorSelectRef = useRef(null)
  const sizeSelectRef = useRef(null)
  const priceSelectRef = useRef(null)

  const getFilterData = () => ({
    categories: categorySelectRef.current.getSelectedCategories(),
    colors: colorSelectRef.current.getSelectedColors(),
    sizes: sizeSelectRef.current.getSelectedSizes(),
    price: priceSelectRef.current.getSelectedPrice(),
  })

  const onFilterChange = () => {
    if (props.onChange) {
      setImmediate(() => props.onChange(getFilterData()))
    }
  }

  const categoryProps = {
    categories: props.categories,
    defaultCategoryIds: props.defaultCategoryIds,
    ref: categorySelectRef,
    onChange: onFilterChange,
  }

  const colorProps = {
    colors: props.colors,
    defaultColorIds: props.defaultColorIds,
    multiple: true,
    ref: colorSelectRef,
    onChange: onFilterChange,
  }

  const sizeProps = {
    sizes: props.sizes,
    defaultSizeIds: props.defaultSizeIds,
    multiple: true,
    ref: sizeSelectRef,
    onChange: onFilterChange,
  }

  const priceProps = {
    ...props.price,
    defaultPrice: props.defaultPrice,
    ref: priceSelectRef,
    onChange: onFilterChange,
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
