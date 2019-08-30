import React from 'react'
import { Typography } from 'antd'
import * as PropTypes from 'prop-types'

const { Text } = Typography

const PriceRenderer = ({ currency, price, discountedPrice }) => {
  if (discountedPrice) {
    return (
      <Text type="danger" strong>
        <span style={{ fontSize: '1.4em' }}>
          {currency}
          {`${discountedPrice.toFixed(2)} `}
        </span>

        <Text delete>
          {currency}
          {price.toFixed(2)}
        </Text>
      </Text>
    )
  }

  return (
    <Text type="danger" style={{ fontSize: '1.4em' }} strong>
      {currency}
      {price.toFixed(2)}
    </Text>
  )
}

export default PriceRenderer

PriceRenderer.propTypes = {
  currency: PropTypes.string,
  price: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number,
}

PriceRenderer.defaultProps = {
  currency: '$',
  discountedPrice: 0.0,
}
