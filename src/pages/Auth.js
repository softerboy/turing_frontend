import React, { useRef } from 'react'
import { withRouter } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { withLayout } from '../components/layout/LayoutMain'
import AuthForm from '../components/auth/AuthForm'
import Wrapper from '../components/auth/Wrapper'

import CUSTOMER_REGISTER_MUTATION from '../graphql/customer-register-mutation.graphql'
import CUSTOMER_LOGIN_MUTATION from '../graphql/customer-login-mutation.graphql'

/* eslint-disable react/prop-types */
const Auth = ({ register, history }) => {
  // used for setting response error message in form
  const formRef = useRef(null)

  const saveAuthData = (cache, { data }) => {
    // depending on login type, extract response by field name
    const mutation = register ? 'customerRegister' : 'customerLogin'
    const auth = data[mutation]

    // update customer cache info
    cache.writeData({ data: { auth } })

    // redirect to the page, where came from
    const defaultRedirect = { from: { pathname: '/' } }
    const { from } = history.location.state || defaultRedirect
    history.replace(from)
  }

  const onError = err => {
    const { setFields } = formRef.current
    const { networkError } = err

    const { errors } = networkError.result
    setFields({ password: { errors } })
  }

  const mutation = register
    ? CUSTOMER_REGISTER_MUTATION
    : CUSTOMER_LOGIN_MUTATION

  const renderProp = (mutate, { loading }) => (
    <AuthForm
      ref={formRef}
      onSubmit={variables => mutate({ variables })}
      register={register}
      loading={loading}
    />
  )

  return (
    <Wrapper>
      <Mutation mutation={mutation} update={saveAuthData} onError={onError}>
        {renderProp}
      </Mutation>
    </Wrapper>
  )
}

Auth.propTypes = {
  register: PropTypes.bool,
}

Auth.defaultProps = {
  register: false,
}

const AuthFormWithLayout = withLayout({ hidePreHeader: true })(Auth)
export default withRouter(AuthFormWithLayout)
