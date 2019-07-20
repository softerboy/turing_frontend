import React from 'react'
import { withLayout } from '../components/layout/LayoutMain'
import LoginForm from '../components/auth/LoginForm'
import Wrapper from '../components/auth/Wrapper'

const Login = () => {
  const login = (/* formData */) => {
    // TODO: do login action
  }

  return (
    <Wrapper>
      <LoginForm onLogin={login} onSubmit={login} />
    </Wrapper>
  )
}

export default withLayout({ auth: true })(Login)
