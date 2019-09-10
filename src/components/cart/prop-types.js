/* eslint-disable import/prefer-default-export */
import * as PropTypes from 'prop-types'

export const propTypeCart = PropTypes.shape({
  item_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  attributes: PropTypes.string.isRequired,
  product_id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  subtotal: PropTypes.number.isRequired,
})

export const propTypeCarts = PropTypes.arrayOf(propTypeCart)
