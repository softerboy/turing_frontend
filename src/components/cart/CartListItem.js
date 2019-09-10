/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react'
import { Col, Icon, List, Row, Typography } from 'antd'

import { propTypeCart } from './prop-types'
import { PRODUCT_IMG_ROOT } from '../../common/constants'
import { AppContext } from '../context/AppContext'
import Counter from '../Counter'
import styles from './CartListItem.module.less'

const { Item } = List
const { Text } = Typography

const grid = {
  image: { xs: { span: 8 }, md: { span: 4 } },
  name: { xs: { span: 16 }, md: { span: 7 } },
  attrs: { xs: { span: 16 }, md: { span: 5 } },
  counter: { xs: { span: 16 }, md: { span: 5 } },
  subtotal: { xs: { span: 16 }, md: { span: 3 } },
}

/* eslint-disable camelcase */
const CartListItem = ({ cart }) => {
  const { name, image, attributes, subtotal, quantity, item_id } = cart
  const { currency } = useContext(AppContext)

  return (
    <Item>
      <Row className={styles.cartRow} gutter={16}>
        <Col {...grid.image}>
          <img
            className={styles.image}
            alt={name}
            src={`${PRODUCT_IMG_ROOT}/${image}`}
          />
        </Col>

        <Col {...grid.name}>
          <Text strong>{name}</Text>
        </Col>

        <Col {...grid.attrs}>
          <Text>{attributes}</Text>
        </Col>

        <Col {...grid.counter} className={styles.counter}>
          <Counter
            key={item_id}
            inputKey={item_id}
            defaultValue={quantity}
            min={1}
          />
        </Col>

        <Col {...grid.subtotal} className={styles.price}>
          <Text strong>
            {currency}
            {subtotal}
          </Text>
        </Col>

        <Col span={24} style={{ textAlign: 'right' }}>
          <span style={{ cursor: 'pointer' }}>
            <Icon className={styles.closeIcon} type="close" />
            <Text>Remove</Text>
          </span>
        </Col>
      </Row>
    </Item>
  )
}

export default CartListItem

CartListItem.propTypes = {
  cart: propTypeCart.isRequired,
}
