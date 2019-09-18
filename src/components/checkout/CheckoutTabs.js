/* eslint-disable react/prop-types, camelcase */
import React, { useContext, useEffect, useState } from 'react'
import { Icon, Tabs, Card } from 'antd'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { withRouter } from 'react-router-dom'

import DeliveryForm from './DeliveryForm'
import './CheckoutTabs.less'
import CardForm from './CardForm'
import { AppContext } from '../context/AppContext'
import OrderSummary from './OrderSummary'

import SHIPPING_REGIONS_QUERY from '../../graphql/shipping-regions-query.graphql'
import ORDER_FEE_QUERY from '../../graphql/order-fee-query.graphql'
import CHECKOUT_MUTATION from '../../graphql/checkout-mutation.graphql'
import EMPTY_CART_MUTATION from '../../graphql/empty-cart-mutation.graphql'
import { getCartId, removeCartData } from '../../common/utils'

const { TabPane: Tab } = Tabs

const tabs = {
  DELIVERY: 'delivery',
  PAYMENT: 'payment',
}

const TabTitle = ({ text, icon }) => (
  <span>
    <Icon type={icon} />
    {text}
  </span>
)

const CheckoutTabs = ({ history }) => {
  const { t } = useTranslation()
  const client = useApolloClient()
  const { currency, auth } = useContext(AppContext)
  const { data } = useQuery(SHIPPING_REGIONS_QUERY)
  const [deliveryForm, setDeliveryForm] = useState(null)
  const [activeTab, setActiveTab] = useState(tabs.DELIVERY)
  const [stripe, setStripe] = useState(null)
  const [orderSummary, setOrderSummary] = useState(null)
  const [amount, setAmount] = useState(0.0)
  const [paymentError, setPaymentError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [emptyCart] = useMutation(EMPTY_CART_MUTATION)

  function setupStripe() {
    setStripe(window.Stripe(process.env.REACT_APP_STRIPE_PUB_KEY))
  }

  // Initialize stripe to null, then update it in
  // useEffect when the script tag has loaded.
  useEffect(() => {
    const stripeElement = document.querySelector('#stripe-js')
    if (!stripe) {
      if (window.Stripe) {
        setupStripe()
      } else {
        stripeElement.addEventListener('load', setupStripe)
      }
    }

    return () => stripeElement.removeEventListener('load', setupStripe)
  }, [stripe])

  async function onDeliveryFormSubmit(form) {
    setDeliveryForm(form)
    try {
      const { shipping_region_id, shipping_id } = form
      const cart_id = await getCartId(client)
      // prettier-ignore
      const { data: { orderFee } } = await client.query({
        query: ORDER_FEE_QUERY,
        variables: { cart_id, shipping_region_id, shipping_id },
      })

      setActiveTab(tabs.PAYMENT)
      const { value } = orderFee.find(item => item.type === 'total')
      setAmount(value)

      const summary = orderFee.map(item => ({
        ...item,
        title: t(item.title),
        value: `${currency}${item.value}`,
      }))
      setOrderSummary(summary)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      // TODO: handle error
    }
  }

  function onTabChange(tab) {
    setActiveTab(tab)
  }

  async function checkout(stripeEl) {
    const cart_id = await getCartId(client)

    try {
      setLoading(true)
      // prettier-ignore
      const { data: { client_secret } } = await client.mutate({
        mutation: CHECKOUT_MUTATION,
        variables: { ...deliveryForm, cart_id },
      })

      // begin charging
      const { error } = await stripeEl.handleCardPayment(client_secret, {
        receipt_email: auth.email,
      })

      if (error) {
        setPaymentError(error.message)
        return
      }
      // remove cart data from cache and backend
      try {
        await removeCartData(client, emptyCart)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err.message)
      } finally {
        setImmediate(() => {
          history.replace({
            pathname: '/thankyou',
            state: { isFromCheckoutPage: true },
          })
        })
      }
    } catch (err) {
      // TODO: handle checkout error
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StripeProvider stripe={stripe}>
      <Card>
        <Tabs activeKey={activeTab} onChange={onTabChange}>
          <Tab
            key={tabs.DELIVERY}
            tab={<TabTitle text={t('Delivery')} icon="car" />}
          >
            <DeliveryForm
              shippingRegions={data.shippingRegions || []}
              onSubmit={onDeliveryFormSubmit}
            />
          </Tab>
          <Tab
            key={tabs.PAYMENT}
            tab={<TabTitle text={t('Payment')} icon="credit-card" />}
            disabled={activeTab === tabs.DELIVERY}
          >
            <OrderSummary
              currency={currency}
              orderSummary={orderSummary || []}
            />
            <Elements>
              <CardForm
                error={paymentError}
                currency={currency}
                amount={amount}
                onPayClick={checkout}
                onChange={() => setPaymentError(null)}
                loading={loading}
              />
            </Elements>
          </Tab>
        </Tabs>
      </Card>
    </StripeProvider>
  )
}

export default withRouter(CheckoutTabs)
