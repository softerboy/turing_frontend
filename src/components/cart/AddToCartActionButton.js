/* eslint-disable camelcase */
import React, { useState } from 'react'
import * as PropTypes from 'prop-types'
import { Button, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useMutation, withApollo } from 'react-apollo'

import ADD_TO_CART_MUTATION from '../../graphql/add-to-cart-mutation.graphql'
import { getCartId } from '../../common/utils'

const AddToCartActionButton = props => {
  // eslint-disable-next-line react/prop-types
  const { product_id, attributes, client } = props
  const { t } = useTranslation()
  const [tooltipVisibility, setTooltipVisibility] = useState(false)
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION)

  const onAddToCartButtonClick = async e => {
    e.preventDefault()

    // check, are product id and attributes provided
    if (!product_id || !attributes) {
      setTooltipVisibility(true)
      const timeout = setTimeout(() => {
        setTooltipVisibility(false)
        clearTimeout(timeout)
      }, 2000)
      return
    }

    const cart_id = await getCartId(client)
    const { data } = await addToCart({
      variables: { cart_id, product_id, attributes },
    })

    // eslint-disable-next-line react/prop-types
    client.writeData({ data: { cartInfo: data.addToCart } })
  }

  return (
    <Tooltip
      placement="rightTop"
      visible={tooltipVisibility}
      title={t('Select color and size')}
    >
      <Button
        loading={loading}
        size="large"
        type="primary"
        shape="round"
        icon="shopping-cart"
        onClick={onAddToCartButtonClick}
      >
        {t('Add to cart')}
      </Button>
    </Tooltip>
  )
}

export default withApollo(AddToCartActionButton)

AddToCartActionButton.propTypes = {
  product_id: PropTypes.number.isRequired,
  attributes: PropTypes.string,
}

AddToCartActionButton.defaultProps = {
  attributes: null,
}
