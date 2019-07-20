import React from 'react'
import { Layout } from 'antd'
import * as PropTypes from 'prop-types'

import HeaderMain from '../header/HeaderMain'
import PreHeader from '../header/PreHeader'

const { Header, Content, Footer } = Layout

const LayoutMain = props => {
  const { children } = props

  return (
    <Layout>
      <PreHeader />
      <Header style={{ lineHeight: 0 }}>
        <HeaderMain />
      </Header>
      <Content style={{ minHeight: '100vh' }}>{children}</Content>
      <Footer />
    </Layout>
  )
}

LayoutMain.propTypes = {
  children: PropTypes.element,
}

LayoutMain.defaultProps = {
  children: null,
}

export default LayoutMain
