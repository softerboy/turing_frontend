import React, { useRef } from 'react'
import { withRouter } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

import { withLayout } from '../components/layout/LayoutMain'
import AuthForm from '../components/auth/AuthForm'
import Wrapper from '../components/auth/Wrapper'

import CUSTOMER_REGISTER_MUTATION from '../graphql/customer-register-mutation.graphql'
import CUSTOMER_LOGIN_MUTATION from '../graphql/customer-login-mutation.graphql'
import { USER_KEY } from '../utils/constants'

/* eslint-disable react/prop-types */
// this export used for testing purpose
// for real use case as a page component use default export
export const Auth = ({ register, history }) => {
  // used for setting response error message in form
  const formRef = useRef(null)

  const update = (cache, { data }) => {
    // depending on login type, extract response by field name
    const mutation = register ? 'customerRegister' : 'customerLogin'
    const auth = data[mutation]

    // update customer cache info
    cache.writeData({ data: { auth } })

    // save token to localStorage
    localStorage.setItem(USER_KEY, auth.accessToken)

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

  const [mutate, { loading }] = useMutation(mutation, {
    onError,
    update,
  })

  return (
    <Wrapper>
      <AuthForm
        ref={formRef}
        onSubmit={variables => mutate({ variables })}
        register={register}
        loading={loading}
      />
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
