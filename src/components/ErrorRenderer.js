import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import BombIcon from './icons/BombIcon'

const { Text, Title } = Typography

/* eslint-disable react/prop-types */
export default function ErrorRenderer({ error }) {
  const { graphQLErrors, networkError } = error
  const { t } = useTranslation()

  if (graphQLErrors && graphQLErrors.length) {
    const { errors } = graphQLErrors[0].extensions.exception
    if (errors[0].status === 404) return <Redirect to="/404" />
  }

  if (networkError) {
    return (
      <Card style={{ textAlign: 'center' }}>
        <BombIcon style={{ fontSize: '4rem', margin: 30, fill: '#fa8c16' }} />
        <Title level={3}>{t('Oops! Something went wrong.')}</Title>
        <Text>
          {t('Check your internet connection or click here to reload page')}
        </Text>
        <div style={{ margin: 16, clear: 'both' }} />
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => window.location.reload()}
        >
          {t('Reload')}
        </Button>
      </Card>
    )
  }

  return <pre>{JSON.stringify(error)}</pre>
}
