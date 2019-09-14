import React, { useContext } from 'react'
import { Button, Modal, Popconfirm } from 'antd'
import * as PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'

import CartList from './CartList'
import { propTypeCarts } from './prop-types'
import './CartModal.less'
import { AppContext } from '../context/AppContext'
import EMPTY_CART_MUTATION from '../../graphql/empty-cart-mutation.graphql'
import { getCartId } from '../../common/utils'
import { CART_ID_KEY } from '../../common/constants'

const btnProps = {
  shape: 'round',
  size: 'large',
}

const CHECKOUT = 'ACTION_CHECKOUT'
const EMPTY_CART = 'ACTION_EMPTY_CART'

/* eslint-disable react/jsx-props-no-spreading */
const CartModalFooter = ({ onButtonClick }) => {
  const { t } = useTranslation()
  return (
    <div className="cartModalFooter" style={{ padding: '15px 25px' }}>
      <Popconfirm
        overlayStyle={{ zIndex: 999999999999 }}
        title={t('Are you sure you want to clear all items?')}
        okText={t('Yes')}
        cancelText={t('No')}
        onConfirm={e => onButtonClick(e, EMPTY_CART)}
      >
        <Button {...btnProps}>{t('Empty cart')}</Button>
      </Popconfirm>
      <Button
        {...btnProps}
        type="primary"
        onClick={e => onButtonClick(e, CHECKOUT)}
      >
        {t('Checkout')}
      </Button>
    </div>
  )
}

CartModalFooter.propTypes = {
  onButtonClick: PropTypes.func,
}

CartModalFooter.defaultProps = {
  onButtonClick: () => {},
}

// eslint-disable-next-line react/prop-types
const CartModal = ({ showModal, onCancel, carts, history }) => {
  const { cartTotalAmount } = useContext(AppContext)
  const [emptyCart] = useMutation(EMPTY_CART_MUTATION)
  const client = useApolloClient()

  const handleFooterActions = async (e, action) => {
    if (action === EMPTY_CART) {
      try {
        // eslint-disable-next-line camelcase
        const cart_id = await getCartId(client)
        // prettier-ignore
        const { data: { cart: cartInfo } } = await emptyCart({ variables: { cart_id } })

        client.writeData({ data: { cartInfo, cartTotalAmount: 0.0 } })
        localStorage.removeItem(CART_ID_KEY)
      } catch (err) {
        // TODO: handle error
        // eslint-disable-next-line no-console
        console.warn(err)
      }
    } else if (action === CHECKOUT) {
      // eslint-disable-next-line react/prop-types
      history.push({
        pathname: '/checkout',
        // eslint-disable-next-line react/prop-types
        state: { from: history.location },
      })
    }
  }

  return (
    <Modal
      style={{ top: 30 }}
      width={767}
      visible={showModal}
      onCancel={onCancel}
      footer={<CartModalFooter onButtonClick={handleFooterActions} />}
      destroyOnClose
    >
      <CartList carts={carts} totalAmount={cartTotalAmount} />
    </Modal>
  )
}

export default withRouter(CartModal)

CartModal.propTypes = {
  carts: propTypeCarts,
  showModal: PropTypes.bool,
  onCancel: PropTypes.func,
}

CartModal.defaultProps = {
  carts: [],
  showModal: false,
  onCancel: () => {},
}
