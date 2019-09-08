import React, { useContext } from 'react'
import * as PropTypes from 'prop-types'
import {
  Typography,
  Col,
  Row,
  Input,
  Icon,
  Badge,
  Button,
  Menu,
  Dropdown,
  notification,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import vars from '../../theme/variables'
import styles from './HeaderMain.module.less'
import { AppContext } from '../context/AppContext'
import localState from '../../local-state'

import CUSTOMER_LOGOUT from '../../graphql/customer-logout-mutation.graphql'
import { USER_KEY } from '../../common/constants'

const { Title } = Typography
const { Item } = Menu

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
  const { isLoggedIn, auth, cartInfo } = useContext(AppContext)

  const cartProductCount = cartInfo.reduce(
    (total, { quantity }) => total + quantity,
    0,
  )

  // called when logout error
  const onError = err => {
    // just show notification error
    notification.error({
      description: err.message,
      message: t('Error'),
    })
  }

  // called when logout completed
  const update = (cache, { data: { customerLogout } }) => {
    // cleat user's token from localStorage
    localStorage.removeItem(USER_KEY)

    if (customerLogout) {
      // reset user's initial state
      cache.writeData({ data: { auth: localState.auth } })
      return
    }

    notification.error({
      message: t('Error'),
      description: t('An error occurred when logging out, please try again'),
    })
  }

  const [logout] = useMutation(CUSTOMER_LOGOUT, {
    onError,
    update,
  })

  const onMenuClick = async ({ key }) => {
    if (key === 'LOGOUT') logout()
  }

  // eslint-disable-next-line
  const menu = ({ email }) => (
    <Menu onClick={onMenuClick}>
      <Item disabled>{email}</Item>
      <Item>{t('Profile')}</Item>
      <Item key="LOGOUT">{t('Logout')}</Item>
    </Menu>
  )

  if (titleOnly) {
    return (
      <Row>
        <Col offset={1} span={22}>
          <div className={styles.container}>
            <Title level={3} style={titleStyle}>
              <Link to="/">{process.env.REACT_APP_NAME}</Link>
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
            <Link to="/">{process.env.REACT_APP_NAME}</Link>
          </Title>

          <div style={{ float: 'right' }}>
            <Input
              className={styles.search}
              prefix={SearchIcon}
              placeholder={t('search anything')}
              allowClear
            />

            {isLoggedIn && (
              <Dropdown overlay={menu(auth)}>
                <Button className={styles.user} type="link">
                  <Icon type="user" />
                </Button>
              </Dropdown>
            )}

            <Badge
              className={styles.cart}
              style={{ backgroundColor: '#fff' }}
              count={cartProductCount}
              showZero
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
