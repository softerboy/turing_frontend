import React from 'react'
import { Col, Row } from 'antd'

import LayoutMain from '../components/layout/LayoutMain'
import CheckoutTabs from '../components/checkout/CheckoutTabs'

const Checkout = () => {
  return (
    <LayoutMain>
      <Row style={{ marginTop: 16 }}>
        {/* prettier-ignore */}
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 18, offset: 3 }}
          md={{ span: 14, offset: 5 }}
          lg={{ span:  8, offset: 8 }}
        >
          <CheckoutTabs />
        </Col>
      </Row>
    </LayoutMain>
  )
}

export default Checkout
