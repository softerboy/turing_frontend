import React from 'react'
import { Card, Form, notification, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import * as PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons'

import SOCIAL_LOGIN_MUTATION from '../../graphql/social-login-mutation.graphql'

import {
  getEmailField,
  getPasswordField,
  getRememberField,
  getUsernameField,
  SubmitButton,
} from './common'
import { USER_KEY } from '../../common/constants'

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
  const client = useApolloClient()
  const { t } = useTranslation()
  const [socialLogin] = useMutation(SOCIAL_LOGIN_MUTATION)

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

  async function onFacebookResponse(response) {
    try {
      const {
        data: { socialLogin: auth },
      } = await socialLogin({
        variables: {
          service: 'FACEBOOK',
          accessToken: response.accessToken,
        },
      })

      client.writeData({ data: { auth } })
      // save token to localStorage
      localStorage.setItem(USER_KEY, auth.accessToken)
    } catch (err) {
      notification.error({
        title: t('Authentication failed'),
        description: err.message,
      })
    }
  }

  function renderSocialButton(renderProps, type) {
    const SocialButton =
      type === 'facebook' ? FacebookLoginButton : GoogleLoginButton
    return (
      <SocialButton
        style={{ width: 230, margin: '15px auto' }}
        onClick={renderProps.onClick}
        size="42px"
        iconSize="18px"
      />
    )
  }

  async function onGoogleResponse(response) {
    try {
      const {
        data: { socialLogin: auth },
      } = await socialLogin({
        variables: {
          service: 'GOOGLE',
          accessToken: response.accessToken,
        },
      })

      client.writeData({ data: { auth } })
      // save token to localStorage
      localStorage.setItem(USER_KEY, auth.accessToken)
    } catch (err) {
      notification.error({
        message: t('Authentication failed'),
        description: err.message,
      })
    }
  }

  function onGoogleFailure() {
    notification.error({
      message: t('Authentication failed'),
    })
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

        {/* render bottom links */}
        <Item>{getBottom()}</Item>
      </Form>

      <div style={{ textAlign: 'center', width: '100%' }}>
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={onFacebookResponse}
          render={renderProp => renderSocialButton(renderProp, 'facebook')}
        />

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_ID}
          buttonText="Login"
          onSuccess={onGoogleResponse}
          onFailure={onGoogleFailure}
          render={renderProp => renderSocialButton(renderProp, 'google')}
        />
      </div>
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
