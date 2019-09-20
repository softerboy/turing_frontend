import React from 'react'
import { Card, Form, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import * as PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  getEmailField,
  getPasswordField,
  getRememberField,
  getUsernameField,
  SubmitButton,
} from './common'

const { Item } = Form
const { Title, Text } = Typography

const textCenter = { textAlign: 'center' }

const AuthForm = props => {
  const {
    form,
    onSubmit,
    forgotLink,
    registerLink,
    register,
    loginLink,
    loading,
  } = props
  const { getFieldDecorator } = form
  const { t } = useTranslation()

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err && onSubmit) {
        onSubmit(values, register)
      }
    })
  }

  const getBottom = () => {
    if (register) {
      return (
        <Row style={textCenter}>
          <Text>
            {t('Already a member?')} <Link to={loginLink}> {t('Sign in')}</Link>
          </Text>
        </Row>
      )
    }

    return (
      <Row type="flex" justify="space-around">
        <Link to={forgotLink}>{t('Forgot password?')}</Link>
        <Link to={registerLink}>{t('Have an account')}</Link>
      </Row>
    )
  }

  return (
    <Card>
      <Title style={{ textAlign: 'center', letterSpacing: '2px' }} level={2}>
        {register ? t('Sign up') : t('Sign in')}
      </Title>
      <Form onSubmit={handleSubmit}>
        {/* username field, show if form type is register */}
        {register && (
          <Item label={t('Username')}>
            {getUsernameField(getFieldDecorator, t)}
          </Item>
        )}

        {/* email field */}
        <Item label={t('Email')}>{getEmailField(getFieldDecorator, t)}</Item>

        {/* password field */}
        <Item label={t('Password')}>
          {getPasswordField(register)(getFieldDecorator, t)}
        </Item>

        {/* remember checkbox, show if form type is register */}
        {register || (
          <Item style={textCenter}>
            {getRememberField(getFieldDecorator, t)}
          </Item>
        )}

        {/*
          submit button, depending on
          form type show "Sign in"  or "Sign up"
        */}
        <Item style={textCenter}>
          <SubmitButton loading={loading}>
            {register ? t('Sign up') : t('Sign in')}
          </SubmitButton>
        </Item>

        <div style={{ textAlign: 'center', width: '100%' }}>
          <Text>{t('Or sign up using')}</Text>
          <hr />
        </div>

        {/* render bottom links */}
        <Item>{getBottom()}</Item>
      </Form>
    </Card>
  )
}

export default Form.create({ name: 'login' })(AuthForm)

const propTypeLink = PropTypes.oneOfType([PropTypes.string, PropTypes.object])

AuthForm.propTypes = {
  forgotLink: propTypeLink,
  form: PropTypes.instanceOf(Object),
  loginLink: propTypeLink,
  loading: PropTypes.bool,

  onSubmit: PropTypes.func,
  // if true register form
  // will be shown instead login form
  register: PropTypes.bool,
  registerLink: propTypeLink,
}

AuthForm.defaultProps = {
  forgotLink: '/forgot',
  form: null,
  loginLink: '/login',
  loading: false,
  onSubmit: null,
  register: false,
  registerLink: '/register',
}
