import React from 'react'
import { Card, Form, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import * as PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  getEmailField,
  getPasswordField,
  getRememberField,
  SubmitButton,
} from './common'

const { Item } = Form
const { Title } = Typography

const textCenter = { textAlign: 'center' }

const LoginForm = props => {
  const { form, onSubmit, forgotLink, registerLink } = props
  const { getFieldDecorator } = form
  const { t } = useTranslation()

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err && onSubmit) {
        onSubmit(values)
      }
    })
  }

  return (
    <Card>
      <Title style={{ textAlign: 'center', letterSpacing: '2px' }} level={2}>
        {t('Sign in')}
      </Title>
      <Form onSubmit={handleSubmit}>
        <Item label={t('Email')}>{getEmailField(getFieldDecorator, t)}</Item>
        <Item label={t('Password')}>
          {getPasswordField(getFieldDecorator, t)}
        </Item>
        <Item style={textCenter}>{getRememberField(getFieldDecorator, t)}</Item>
        <Item style={textCenter}>
          <SubmitButton>{t('Sign in')}</SubmitButton>
        </Item>
        <Item>
          <Row type="flex" justify="space-between">
            <Link to={forgotLink}>{t('Forgot password?')}</Link>
            <Link to={registerLink}>{t('Have an account')}</Link>
          </Row>
        </Item>
      </Form>
    </Card>
  )
}

export default Form.create({ name: 'login' })(LoginForm)

const propTypeLink = PropTypes.oneOfType([PropTypes.string, PropTypes.object])

LoginForm.propTypes = {
  form: PropTypes.instanceOf(Object),
  onSubmit: PropTypes.func,
  forgotLink: propTypeLink,
  registerLink: propTypeLink,
}

LoginForm.defaultProps = {
  form: null,
  onSubmit: null,
  forgotLink: '/forgot',
  registerLink: '/register',
}
