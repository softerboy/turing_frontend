import React from 'react'
import * as PropTypes from 'prop-types'

import { withLayout } from '../components/layout/LayoutMain'
import LoginForm from '../components/auth/AuthForm'
import Wrapper from '../components/auth/Wrapper'

const Auth = ({ register }) => {
  const submit = (isRegister /* formData */) => {
    if (isRegister) {
      // TODO: handle register action
    } else {
      // TODO: handle login action
    }
  }

  return (
    <Wrapper>
      <LoginForm onSubmit={submit} register={register} />
    </Wrapper>
  )
}

Auth.propTypes = {
  register: PropTypes.bool,
}

Auth.defaultProps = {
  register: false,
}

export default withLayout({ auth: true })(Auth)
