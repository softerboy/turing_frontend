import React, { useContext } from 'react'
import { Col, List, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import * as PropTypes from 'prop-types'

import CartListItem from './CartListItem'
import { propTypeCarts } from './prop-types'
import styles from './CartList.module.less'
import { AppContext } from '../context/AppContext'

const { Text, Title } = Typography

const style = {
  colHeader: { textAlign: 'center' },
}

function renderCartItem(cart) {
  return <CartListItem cart={cart} />
}

const CartListHeader = ({ count, totalAmount }) => {
  const { currency } = useContext(AppContext)
  const { t } = useTranslation()
  return (
    <div>
      <Row>
        <Col>
          <Title
            level={4}
            style={{ textTransform: 'capitalize', marginBottom: 0 }}
          >
            {t('{{count}} items in your cart', { count })}
          </Title>
          <Title style={{ marginTop: 0 }} level={4} type="danger">
            <small>
              {t('Total amount {{currency}}{{amount}}', {
                amount: totalAmount,
                currency,
              })}
            </small>
          </Title>
        </Col>
      </Row>
      <Row className={styles.cartListColHeader}>
        <Col xs={11}>
          <Text strong>{t('Item')}</Text>
        </Col>
        <Col xs={5}>
          <Text strong>{t('Color, Size')}</Text>
        </Col>
        <Col style={style.colHeader} xs={5}>
          <Text strong>{t('Quantity')}</Text>
        </Col>
        <Col style={style.colHeader} xs={3}>
          <Text strong>{t('Subtotal')}</Text>
        </Col>
        <Col span={24} style={{ marginTop: 16 }}>
          <hr className={styles.hr} />
        </Col>
      </Row>
    </div>
  )
}

const CartList = props => {
  const { carts = [], totalAmount } = props
  const count = carts.reduce((total, { quantity }) => total + quantity, 0)

  return (
    <>
      <CartListHeader count={count} totalAmount={totalAmount} />
      <List
        dataSource={carts}
        renderItem={renderCartItem}
        pagination={{ pageSize: 3 }}
        split={false}
      />
    </>
  )
}

export default CartList

CartListHeader.propTypes = {
  count: PropTypes.number,
  totalAmount: PropTypes.number,
}

CartListHeader.defaultProps = {
  count: 0,
  totalAmount: 0.0,
}

CartList.propTypes = {
  carts: propTypeCarts,
  totalAmount: PropTypes.number,
}

CartList.defaultProps = {
  carts: [],
  totalAmount: 0.0,
}
