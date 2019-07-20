import { Button, Checkbox, Input } from 'antd'
import React from 'react'

// eslint-disable-next-line
export const SubmitButton = ({ children }) => (
  <Button
    style={{ padding: '0 46px' }}
    size="large"
    shape="round"
    type="primary"
    htmlType="submit"
  >
    {children}
  </Button>
)

export const getEmailField = (fieldDecorator, t) => {
  return fieldDecorator('email', {
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

export const getPasswordField = (fieldDecorator, t) => {
  return fieldDecorator('password', {
    rules: [
      {
        required: true,
        type: 'string',
        message: t('Please input your password'),
      },
      {
        min: 6,
        message: t('Password length must be at least 6 character'),
      },
    ],
  })(<Input.Password size="large" />)
}

export const getRememberField = (fieldDecorator, t) => {
  return fieldDecorator('remember', { initialValue: false })(
    <Checkbox size="large">{t('Remember')}</Checkbox>,
  )
}
