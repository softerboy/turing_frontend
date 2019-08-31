import React from 'react'
import * as PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ProductGridItemNormal from './ProductGridItemNormal'
import ProductGridItemHover from './ProductGridItemHover'
import styles from './ProductGridItem.module.less'

const ProductGridItem = ({ product }) => {
  const to = { pathname: 'product', params: { productId: product.product_id } }
  return (
    <Link to={to} className={styles.cardContainer}>
      <ProductGridItemNormal product={product} />
      <ProductGridItemHover product={product} className={styles.cardHover} />
    </Link>
  )
}

export default ProductGridItem

ProductGridItem.propTypes = {
  product: PropTypes.shape({
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
}

ProductGridItem.defaultProps = {
  product: null,
}
