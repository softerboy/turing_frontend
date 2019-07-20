import React from 'react'
import * as PropTypes from 'prop-types'
import { Typography, Col, Row, Input, Icon, Badge } from 'antd'
import { useTranslation } from 'react-i18next'

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

const HeaderMain = ({ titleOnly }) => {
  const { t } = useTranslation()

  if (titleOnly) {
    return (
      <Row>
        <Col offset={1} span={22}>
          <div className={styles.container}>
            <Title level={3} style={titleStyle}>
              {process.env.REACT_APP_NAME}
            </Title>
          </div>
        </Col>
      </Row>
    )
  }

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
              placeholder={t('search anything')}
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
          placeholder={t('search anything')}
          allowClear
        />
      </Col>
    </Row>
  )
}

HeaderMain.propTypes = {
  // if true only title will be shown,
  // cart and search element will be hidden
  titleOnly: PropTypes.bool,
}

HeaderMain.defaultProps = {
  titleOnly: false,
}

export default HeaderMain
