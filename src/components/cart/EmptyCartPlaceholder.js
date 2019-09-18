import React from 'react'
import { Button, Card, Icon, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as PropTypes from 'prop-types'

const { Text, Title } = Typography

function EmptyCartPlaceholder({ hasContinueShoppingButton }) {
  const { t } = useTranslation()
  return (
    <Card>
      <div style={{ textAlign: 'center' }}>
        <Icon
          type="smile"
          rotate={180}
          style={{ fontSize: '4rem', color: '#fa8c16', marginBottom: 30 }}
        />
        <Title level={3}>{t('Unfortunately, Your Cart Is Empty')}</Title>
        <Text>{t('Please Add Something In Your Cart')}</Text>
        <div style={{ margin: 32, clear: 'both' }} />
        {hasContinueShoppingButton && (
          <Link to="/">
            <Button type="primary" size="large" shape="round">
              {t('Continue Shopping')}
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}

export default EmptyCartPlaceholder

EmptyCartPlaceholder.propTypes = {
  hasContinueShoppingButton: PropTypes.bool,
}

EmptyCartPlaceholder.defaultProps = {
  hasContinueShoppingButton: false,
}
