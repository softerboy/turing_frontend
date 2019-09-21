import React, { useContext, useEffect, useState } from 'react'
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
import { Link, withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import debounce from 'lodash.debounce'

import vars from '../../theme/variables'
import styles from './HeaderMain.module.less'
import { AppContext } from '../context/AppContext'
import localState from '../../local-state'

import CUSTOMER_LOGOUT from '../../graphql/customer-logout-mutation.graphql'
import { USER_KEY } from '../../common/constants'
import CartModal from '../cart/CartModal'
import {
  searchTermFromQueryString,
  searchTermToQueryString,
} from '../../common/utils'

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

/* eslint-disable react/prop-types */
const HeaderMain = ({ titleOnly, history }) => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState(null)
  const { isLoggedIn, auth, cartInfo } = useContext(AppContext)

  useEffect(() => {
    const value = searchTermFromQueryString(history.location.search)
    setSearch(value)
    // eslint-disable-next-line react/prop-types
  }, [history.location.search])

  const cartProductCount = cartInfo.reduce(
    (total, { quantity }) => total + quantity,
    0,
  )

  const showCart = () => setShowModal(true)

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

  function applySearch(term) {
    const queryString = searchTermToQueryString(term, history.location.search)
    history.push(`/products?${queryString}`)
  }

  const applySearchDebounce = debounce(applySearch, 500)

  function onSearchChange(e) {
    const { value } = e.target
    setSearch(value)
    if (!value) applySearchDebounce(value)
  }

  function onSearchSubmit(e) {
    e.preventDefault()
    applySearch(search)
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
    <form onSubmit={onSearchSubmit}>
      <Row>
        <Col span={12}>
          <CartModal
            showModal={showModal}
            carts={cartInfo}
            onCancel={() => setShowModal(false)}
          />
        </Col>
        <Col offset={1} span={22}>
          <div className={styles.container}>
            <Title level={3} style={titleStyle}>
              <Link to="/">{process.env.REACT_APP_NAME}</Link>
            </Title>

            <div style={{ float: 'right' }}>
              <Input
                onChange={onSearchChange}
                className={styles.search}
                prefix={SearchIcon}
                placeholder={t('search anything')}
                allowClear
                value={search}
              />

              {isLoggedIn && (
                <Dropdown overlay={menu(auth)} overlayStyle={{ zIndex: 2000 }}>
                  <Button className={styles.user} type="link">
                    <Icon type="user" />
                  </Button>
                </Dropdown>
              )}

              <Badge
                onClick={showCart}
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
            onChange={onSearchChange}
            className={styles.searchXs}
            prefix={SearchIcon}
            placeholder={t('search anything')}
            allowClear
            value={search}
          />
        </Col>
      </Row>

      <input type="submit" style={{ display: 'none' }} />
    </form>
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

export default withRouter(HeaderMain)
