import React from 'react'
import { Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import vars from '../../theme/variables'

const { Text } = Typography

const linkStyle = {
  color: vars['@primary-color'],
}

const PreHeader = () => {
  const { t } = useTranslation()

  return (
    <Row>
      <Col offset={1} span={22} style={{ padding: 8 }}>
        <Text strong style={{ margin: 0 }}>
          <Text>{t('Hi!')}</Text>
          <Text style={linkStyle}>{t('Sign in')}</Text>
          <Text>{t('or')}</Text>
          <Text style={linkStyle}>{t('Register')}</Text>
        </Text>
      </Col>
    </Row>
  )
}

export default PreHeader
