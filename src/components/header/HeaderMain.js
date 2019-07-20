import React from 'react'
import { Typography, Col, Row, Input, Icon, Badge } from 'antd'

import vars from '../../theme/variables'
import styles from './HeaderMain.module.less'

const { Title } = Typography

const titleStyle = {
  textTransform: 'uppercase',
  color: vars['@primary-color'],
  letterSpacing: 4,
  margin: 0,
  width: 'auto',
  display: 'inline',
}

const SearchIcon = <Icon type="search" />

const HeaderMain = () => {
  return (
    <Row>
      <Col offset={1} span={22}>
        <div className={styles.container}>
          <Title level={3} style={titleStyle}>
            {process.env.REACT_APP_NAME}
          </Title>

          <div style={{ float: 'right' }}>
            <Input
              className={styles.search}
              prefix={SearchIcon}
              placeholder="search anything"
              allowClear
            />

            <Badge
              className={styles.cart}
              count={2}
              style={{ backgroundColor: '#fff' }}
            >
              <Icon type="shopping-cart" />
            </Badge>
          </div>
        </div>
      </Col>
      <Col>
        <Input
          className={styles.searchXs}
          prefix={SearchIcon}
          placeholder="search anything"
          allowClear
        />
      </Col>
    </Row>
  )
}

export default HeaderMain
