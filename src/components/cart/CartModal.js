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
import { removeCartData } from '../../common/utils'

const btnProps = {
  shape: 'round',
  size: 'large',
}

const CHECKOUT = 'ACTION_CHECKOUT'
const EMPTY_CART = 'ACTION_EMPTY_CART'

/* eslint-disable react/jsx-props-no-spreading */
const CartModalFooter = ({ onButtonClick, disabled }) => {
  const { t } = useTranslation()
  return (
    <div className="cartModalFooter" style={{ padding: '15px 25px' }}>
      <Popconfirm
        className="popupoverEmptyCart"
        disabled={disabled}
        overlayStyle={{ zIndex: 999999999999 }}
        title={t('Are you sure you want to clear all items?')}
        okText={t('Yes')}
        cancelText={t('No')}
        onConfirm={e => onButtonClick(e, EMPTY_CART)}
      >
        <Button {...btnProps} disabled={disabled}>
          {t('Empty cart')}
        </Button>
      </Popconfirm>
      <Button
        {...btnProps}
        disabled={disabled}
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
  disabled: PropTypes.bool,
}

CartModalFooter.defaultProps = {
  onButtonClick: () => {},
  disabled: false,
}

// eslint-disable-next-line react/prop-types
const CartModal = ({ showModal, onCancel, carts, history }) => {
  const { cartTotalAmount, cartInfo } = useContext(AppContext)
  const [emptyCart] = useMutation(EMPTY_CART_MUTATION)
  const client = useApolloClient()

  const handleFooterActions = async (e, action) => {
    if (action === EMPTY_CART) {
      await removeCartData(client, emptyCart)
    } else if (action === CHECKOUT) {
      // eslint-disable-next-line react/prop-types
      history.push({
        pathname: '/checkout',
        // eslint-disable-next-line react/prop-types
        state: { from: history.location },
      })
    }
  }

  const disabled = !cartInfo || !cartInfo.length

  return (
    <Modal
      style={{ top: 30 }}
      width={767}
      visible={showModal}
      onCancel={onCancel}
      footer={
        <CartModalFooter
          disabled={disabled}
          onButtonClick={handleFooterActions}
        />
      }
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
