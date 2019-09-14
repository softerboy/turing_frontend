/* eslint-disable react/prop-types, camelcase */
import React, { useContext, useEffect, useState } from 'react'
import { Icon, Tabs, Card } from 'antd'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { Elements, StripeProvider } from 'react-stripe-elements'

import DeliveryForm from './DeliveryForm'
import './CheckoutTabs.less'
import CardForm from './CardForm'
import { AppContext } from '../context/AppContext'
import OrderSummary from './OrderSummary'

import SHIPPING_REGIONS_QUERY from '../../graphql/shipping-regions-query.graphql'
import ORDER_FEE_QUERY from '../../graphql/order-fee-query.graphql'
import { getCartId } from '../../common/utils'

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

const CheckoutTabs = () => {
  const { t } = useTranslation()
  const client = useApolloClient()
  const { currency } = useContext(AppContext)
  const { data } = useQuery(SHIPPING_REGIONS_QUERY)
  // const [deliveryForm, setDeliveryForm] = useState({})
  const [activeTab, setActiveTab] = useState(tabs.DELIVERY)
  const [stripe, setStripe] = useState(null)
  const [orderSummary, setOrderSummary] = useState(null)
  const [amount, setAmount] = useState(0.0)

  // Initialize stripe to null, then update it in
  // useEffect when the script tag has loaded.
  useEffect(() => {
    if (!stripe) {
      if (window.Stripe) {
        setStripe(window.Stripe(process.env.REACT_APP_STRIPE_PUB_KEY))
      } else {
        document.querySelector('#stripe-js').addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          setStripe(window.Stripe(process.env.REACT_APP_STRIPE_PUB_KEY))
        })
      }
    }
  }, [stripe])

  async function onDeliveryFormSubmit(form) {
    // setDeliveryForm(form)
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
              <CardForm currency={currency} amount={amount} />
            </Elements>
          </Tab>
        </Tabs>
      </Card>
    </StripeProvider>
  )
}

export default CheckoutTabs
