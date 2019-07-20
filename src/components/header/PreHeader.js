import React from 'react'
import { Col, Row, Typography } from 'antd'

import vars from '../../theme/variables'

const { Text } = Typography

const linkStyle = {
  color: vars['@primary-color'],
}

const PreHeader = () => (
  <Row>
    <Col offset={1} span={22} style={{ padding: 8 }}>
      <Text strong style={{ margin: 0 }}>
        <Text>Hi! </Text>
        <Text style={linkStyle}>Sign in </Text>
        <Text>or </Text>
        <Text style={linkStyle}>Register</Text>
      </Text>
    </Col>
  </Row>
)

export default PreHeader
