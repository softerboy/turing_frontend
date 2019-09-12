import React, { useState } from 'react'
import { Icon, Tabs } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import DeliveryForm from './DeliveryForm'
import SHIPPING_REGIONS_QUERY from '../../graphql/shipping-regions-query.graphql'
import './CheckoutTabs.less'

const { TabPane: Tab } = Tabs

const tabs = {
  DELIVERY: 'delivery',
  PAYMENT: 'payment',
}

// eslint-disable-next-line react/prop-types
const TabTitle = ({ text, icon }) => (
  <span>
    <Icon type={icon} />
    {text}
  </span>
)

const CheckoutTabs = () => {
  const { t } = useTranslation()
  const { data } = useQuery(SHIPPING_REGIONS_QUERY)
  // const [deliveryForm, setDeliveryForm] = useState(null)
  const [activeTab, setActiveTab] = useState(tabs.DELIVERY)

  function onDeliveryFormSubmit(/* form */) {
    // setDeliveryForm(form)
    setActiveTab(tabs.PAYMENT)
  }

  function onTabChange(tab) {
    setActiveTab(tab)
  }

  return (
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
      />
    </Tabs>
  )
}

export default CheckoutTabs
