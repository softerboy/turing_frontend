import React from 'react'
import { Layout } from 'antd'
import * as PropTypes from 'prop-types'

import HeaderMain from '../header/HeaderMain'
import PreHeader from '../header/PreHeader'

const { Header, Content, Footer } = Layout

const LayoutMain = props => {
  const { children, auth } = props

  return (
    <Layout>
      {auth || <PreHeader />}
      <Header style={{ lineHeight: 0 }}>
        <HeaderMain titleOnly={auth} />
      </Header>
      <Content style={{ minHeight: '100vh' }}>{children}</Content>
      <Footer />
    </Layout>
  )
}

LayoutMain.propTypes = {
  children: PropTypes.element,

  // if true only app title will be shown
  auth: PropTypes.bool,
}

LayoutMain.defaultProps = {
  children: null,
  auth: false,
}

export default LayoutMain

export const withLayout = options => Component => props => (
  <LayoutMain {...options}>
    <Component {...props} />
  </LayoutMain>
)
