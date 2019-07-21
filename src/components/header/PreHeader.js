import React from 'react'
import { Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const { Text } = Typography

const PreHeader = () => {
  const { t } = useTranslation()

  return (
    <Row>
      <Col offset={1} span={22} style={{ padding: 8 }}>
        <Text strong style={{ margin: 0 }}>
          {t('Hi!')}
          <Link to="/login">{t('Sign in')}</Link>
          {t('or')}
          <Link to="/register">{t('Register')}</Link>
        </Text>
      </Col>
    </Row>
  )
}

export default PreHeader
