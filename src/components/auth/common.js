import { Button, Checkbox, Input } from 'antd'
import React from 'react'

// eslint-disable-next-line
export const SubmitButton = ({ loading, children }) => (
  <Button
    style={{ padding: '0 46px' }}
    size="large"
    shape="round"
    type="primary"
    htmlType="submit"
    loading={loading}
  >
    {children}
  </Button>
)

export const getUsernameField = (fieldDecorator, t) => {
  return fieldDecorator('name', {
    validateFirst: true,
    rules: [
      {
        required: true,
        message: t('Please input your username'),
      },
      {
        min: 3,
        message: t('Username length must be at least 3 character'),
      },
    ],
  })(<Input size="large" />)
}

export const getEmailField = (fieldDecorator, t) => {
  return fieldDecorator('email', {
    validateFirst: true,
    rules: [
      {
        required: true,
        message: t('Please input your email!'),
      },
      {
        type: 'email',
        message: 'Invalid email address',
      },
    ],
  })(<Input size="large" />)
}

const loginFormPasswordRules = t => [
  {
    required: true,
    type: 'string',
    message: t('Please input your password'),
  },
  {
    min: 6,
    message: t('Password length must be at least 6 character'),
  },
]

const registerFormPasswordRules = t => [
  {
    pattern: /(?=.*[a-z])/,
    message: t(
      'The password must contain at least 1 lowercase alphabetical character',
    ),
  },
  {
    pattern: /(?=.*[A-Z])/,
    message: t(
      'The password must contain at least 1 uppercase alphabetical character',
    ),
  },
  {
    pattern: /(?=.*[0-9])/,
    message: t('The password must contain at least 1 numeric character'),
  },
  {
    pattern: /(?=.[!@#$%^&])/,
    message: t('The password must contain at least 1 special character'),
  },
  {
    max: 50,
    message: t('The password length must be between 6 and 50 characters long'),
  },
]

export const getPasswordField = (register = false) => (fieldDecorator, t) => {
  return fieldDecorator('password', {
    validateFirst: true,
    rules: register
      ? loginFormPasswordRules(t).concat(registerFormPasswordRules(t))
      : loginFormPasswordRules(t),
  })(<Input.Password size="large" />)
}

export const getRememberField = (fieldDecorator, t) => {
  return fieldDecorator('remember', { initialValue: false })(
    <Checkbox size="large">{t('Remember')}</Checkbox>,
  )
}
