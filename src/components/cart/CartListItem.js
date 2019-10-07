/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react'
import {
  Col,
  Icon,
  List,
  notification,
  Popconfirm,
  Row,
  Typography,
} from 'antd'
import debounce from 'lodash.debounce'

import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { propTypeCart } from './prop-types'
import { PRODUCT_IMG_ROOT } from '../../common/constants'
import { AppContext } from '../context/AppContext'
import Counter from '../Counter'
import styles from './CartListItem.module.less'
import UPDATE_CART_MUTATION from '../../graphql/update-cart-mutation.graphql'
import REMOVE_CART_ITEM_MUTATION from '../../graphql/remove-cart-item-mutation.graphql'
import { updateTotalAmount } from '../../common/utils'

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
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM_MUTATION)

  const handleCartCountChange = debounce(async (count, itemId) => {
    // prettier-ignore
    try {
      const { data: { cart: cartInfo } } = await updateCart({
        variables: { quantity: count, item_id: itemId },
      })

      // update cart data
      client.writeData({ data: { cartInfo } })
      await updateTotalAmount(client)
    } catch(err) {
      // eslint-disable-next-line no-console
      console.warn(err)

      notification.error({
        message: t('Error'),
        description: t('Something went wrong updating with your cart,' +
          ' check your internet connection and try again')
      })
    }
  }, 500)

  const onRemovalConfirmed = async itemId => {
    try {
      // prettier-ignore
      const { data: { cart: cartInfo } } = await removeCartItem({
        variables: { item_id: itemId }
      })

      client.writeData({ data: { cartInfo } })
      await updateTotalAmount(client)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)

      notification.error({
        message: t('Error'),
        description: t(
          'Something went wrong on removing cart item, ' +
            'check your internet connection and try again',
        ),
      })
    }
  }

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
          <Popconfirm
            title={t('Are you sure delete this item?')}
            onConfirm={() => onRemovalConfirmed(item_id)}
            okText={t('Yes')}
            cancelText={t('No')}
            overlayStyle={{ zIndex: 999999999999 }}
          >
            <span style={{ cursor: 'pointer' }}>
              <Icon className={styles.closeIcon} type="close" />
              <Text>{t('Remove')}</Text>
            </span>
          </Popconfirm>
        </Col>
      </Row>
    </Item>
  )
}

export default CartListItem

CartListItem.propTypes = {
  cart: propTypeCart.isRequired,
}
