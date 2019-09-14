import React from 'react'
import { Typography } from 'antd'
import * as PropTypes from 'prop-types'

import styles from './PaySummary.module.less'

const { Text } = Typography

function getStyle(type) {
  return type === 'total' ? { fontSize: '1.2em' } : null
}

function OrderSummary({ orderSummary }) {
  return (
    <div style={{ margin: '15px 0' }}>
      <table className={styles.paySummary}>
        <tbody>
          {orderSummary.map(({ type, title, value }) => {
            return (
              <tr key={title} style={getStyle(type)}>
                <td>
                  <Text strong>{title}</Text>
                </td>
                <td>{value}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

OrderSummary.propTypes = {
  orderSummary: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
}

OrderSummary.defaultProps = {
  orderSummary: [],
}

export default OrderSummary
