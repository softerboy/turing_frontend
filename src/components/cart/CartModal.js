import React, { useContext } from 'react'
import { Button, Modal } from 'antd'
import * as PropTypes from 'prop-types'

import CartList from './CartList'
import { propTypeCarts } from './prop-types'
import './CartModal.less'
import { AppContext } from '../context/AppContext'

const btnProps = {
  shape: 'round',
  size: 'large',
}

const BACK_TO_SHOP = 'ACTION_BACK_TO_SHOP'
const CHECKOUT = 'ACTION_CHECKOUT'

/* eslint-disable react/jsx-props-no-spreading */
const CartModalFooter = ({ onButtonClick }) => {
  return (
    <div className="cartModalFooter" style={{ padding: '15px 25px' }}>
      <Button {...btnProps} onClick={e => onButtonClick(e, BACK_TO_SHOP)}>
        Back to Shop
      </Button>
      <Button
        {...btnProps}
        type="primary"
        onClick={e => onButtonClick(e, CHECKOUT)}
      >
        Checkout
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

const CartModal = ({ showModal, onCancel, carts }) => {
  const { cartTotalAmount } = useContext(AppContext)
  const handleFooterActions = (e, action) => {
    if (action === BACK_TO_SHOP) onCancel()
    else if (action === CHECKOUT) {
      // TODO: handle checkout
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

export default CartModal

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
