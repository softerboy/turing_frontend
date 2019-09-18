import React from 'react'
import { Button, Card, Icon, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import LayoutMain from '../components/layout/LayoutMain'

const { Text, Title } = Typography

/* eslint-disable react/prop-types */
const ThankYou = props => {
  const { history, location } = props
  const { isFromCheckoutPage = false } = location.state || {}
  const { t } = useTranslation()
  if (!isFromCheckoutPage) history.replace('/')

  return (
    <LayoutMain>
      <Card style={{ textAlign: 'center', marginTop: 32 }}>
        <Icon
          type="check-circle"
          style={{ fontSize: '4rem', margin: 30, color: '#73d13d' }}
        />
        <Title level={3}>{t('Thank You')}</Title>
        <Text>{t('Your Order Was Completed Successfully!')}</Text>
        <div style={{ margin: '32px 0', clear: 'both' }} />
        <Link to="/">
          <Button type="primary" shape="round" size="large">
            {t('Continue Shopping')}
          </Button>
        </Link>
      </Card>
    </LayoutMain>
  )
}

export default ThankYou
