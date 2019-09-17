import React, { useEffect, useState } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Form, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import * as PropTypes from 'prop-types'

import { SubmitButton } from '../auth/common'
import styles from './CardForm.module.less'

const { Text } = Typography

// prettier-ignore
const cardInputClasses = [
  'ant-input',
  'ant-input-lg',
  styles.creditCard,
].join(' ')

/* eslint-disable react/prop-types */
const CardForm = props => {
  const {
    stripe,
    amount,
    currency,
    onPayClick,
    error,
    loading,
    onChange,
  } = props
  const { t } = useTranslation()
  const [errorMsg, setErrorMsg] = useState(error)

  useEffect(() => setErrorMsg(error), [error])

  function onPay(e) {
    e.preventDefault()
    onPayClick(stripe)
  }

  return (
    <Form onSubmit={onPay}>
      <div>
        <div style={{ marginBottom: 16 }}>
          <Text type="danger">* </Text>
          <Text>{t('Card details')}</Text>
        </div>
        <CardElement onChange={onChange} className={cardInputClasses} />
        <Text type="danger" className={styles.errorStyle}>
          {errorMsg}
        </Text>
      </div>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <SubmitButton loading={loading}>
          {t('Pay')} {currency}
          {amount}
        </SubmitButton>
      </div>
    </Form>
  )
}

export default injectStripe(Form.create({ name: 'payment' })(CardForm))

CardForm.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string,
  onPayClick: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
}

CardForm.defaultProps = {
  amount: 0.0,
  currency: '$',
  onPayClick: () => {},
  error: null,
  loading: false,
  onChange: () => {},
}
