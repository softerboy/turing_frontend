import React, { useContext } from 'react'
import { Layout } from 'antd'
import * as PropTypes from 'prop-types'

import HeaderMain from '../header/HeaderMain'
import PreHeader from '../header/PreHeader'
import { AppContext } from '../context/AppContext'

const { Header, Content, Footer } = Layout

const LayoutMain = props => {
  const { children, hidePreHeader } = props

  const { isLoggedIn } = useContext(AppContext)

  return (
    <Layout>
      {/* hide if current page is login/register
          or user is already logged in */}
      {hidePreHeader || isLoggedIn || <PreHeader />}
      <Header style={{ lineHeight: 0 }}>
        <HeaderMain titleOnly={hidePreHeader} />
      </Header>
      <Content style={{ minHeight: '100vh' }}>{children}</Content>
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
