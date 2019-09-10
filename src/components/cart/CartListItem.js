/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react'
import { Col, Icon, List, Row, Typography } from 'antd'
import debounce from 'lodash.debounce'

import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { propTypeCart } from './prop-types'
import { PRODUCT_IMG_ROOT } from '../../common/constants'
import { AppContext } from '../context/AppContext'
import Counter from '../Counter'
import styles from './CartListItem.module.less'
import UPDATE_CART_MUTATION from '../../graphql/update-cart-mutation.graphql'
import TOTAL_AMOUNT_QUERY from '../../graphql/total-amount-query.graphql'
import { getCartId } from '../../common/utils'

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
  const { t } = useTranslation()
  const client = useApolloClient()
  const [updateCart] = useMutation(UPDATE_CART_MUTATION)

  const handleCartCountChange = debounce(async (count, itemId) => {
    // prettier-ignore
    try {
      const { data: { cart: cartInfo } } = await updateCart({
        variables: { quantity: count, item_id: itemId },
      })

      // update cart data
      client.writeData({ data: { cartInfo } })

      // update total amount
      const cart_id = await getCartId(client)
      const { data } = await client.query({
        query: TOTAL_AMOUNT_QUERY,
        variables: { cart_id },
        fetchPolicy: 'network-only',
      })

      if (data && data.totalAmount) {
        client.writeData({ data: { cartTotalAmount: data.totalAmount } })
      }
    } catch(err) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.warn(err)
    }
  }, 500)

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
            onChange={count => handleCartCountChange(count, item_id)}
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
            <Text>{t('Remove')}</Text>
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
