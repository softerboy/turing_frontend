/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react'
import { Col, Layout, Row } from 'antd'
import * as PropTypes from 'prop-types'

import HeaderMain from '../header/HeaderMain'
import PreHeader from '../header/PreHeader'
import { AppContext } from '../context/AppContext'

const { Header, Content, Footer } = Layout

const LayoutMain = props => {
  const { children, hidePreHeader } = props

  const { isLoggedIn } = useContext(AppContext)

  return (
    /*
     *  we will hide pre-header if current page is
     *  login/register page or user is already logged in
     */
    <Layout>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 99999,
          background: 'white',
        }}
      >
        {hidePreHeader || isLoggedIn || <PreHeader />}
        <Header style={{ lineHeight: 0 }}>
          <HeaderMain titleOnly={hidePreHeader} />
        </Header>
      </div>
      <Content style={{ minHeight: '100vh' }}>
        <Row>
          <Col span={22} offset={1}>
            {children}
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  )
}

LayoutMain.propTypes = {
  children: PropTypes.element,

  // if true only app title will be shown
  hidePreHeader: PropTypes.bool,
}

LayoutMain.defaultProps = {
  children: null,
  hidePreHeader: false,
}

export default LayoutMain

export const withLayout = options => Component => props => (
  <LayoutMain {...options}>
    <Component {...props} />
  </LayoutMain>
)
