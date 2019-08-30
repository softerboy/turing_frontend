import React from 'react'
import * as PropTypes from 'prop-types'
import { List } from 'antd'

import ProductGridItem from './ProductGridItem'

const { Item: ListItem } = List
const grid = {
  gutter: 16,
  xs: 2,
  sm: 2,
  md: 3,
  xxl: 5,
}

const ProductGrid = props => {
  const { products } = props

  const renderProduct = product => {
    return (
      <ListItem>
        <ProductGridItem product={product} />
      </ListItem>
    )
  }

  return <List grid={grid} dataSource={products} renderItem={renderProduct} />
}

export default ProductGrid

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
      discounted_price: PropTypes.number,
      image: PropTypes.string,
      image_2: PropTypes.string,
      thumbnail: PropTypes.string,
      display: PropTypes.number,
    }),
  ),
}

ProductGrid.defaultProps = {
  products: [],
}
