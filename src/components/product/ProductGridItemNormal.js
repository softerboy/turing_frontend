/* eslint-disable camelcase */
import React, { useContext } from 'react'
import * as PropTypes from 'prop-types'
import { Card } from 'antd'

import { PRODUCT_IMG_ROOT } from '../../common/constants'
import styles from './ProductGridItem.module.less'
import PriceRenderer from './PriceRenderer'
import { AppContext } from '../context/AppContext'

const ProductGridItemNormal = ({ product }) => {
  const { currency } = useContext(AppContext)
  const { name, image, price, discounted_price } = product

  return (
    <Card
      className={styles.imgContainer}
      cover={
        <img
          alt={image}
          src={`${PRODUCT_IMG_ROOT}/${image}`}
          className={styles.img}
        />
      }
    >
      <Card.Meta
        style={{ minHeight: 80 }}
        title={name}
        description={
          <PriceRenderer
            currency={currency}
            price={price}
            discountedPrice={discounted_price}
          />
        }
      />
    </Card>
  )
}

export default ProductGridItemNormal

ProductGridItemNormal.propTypes = {
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

ProductGridItemNormal.defaultProps = {
  product: null,
}
