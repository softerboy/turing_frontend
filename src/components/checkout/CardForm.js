import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import * as PropTypes from 'prop-types'

import { SubmitButton } from '../auth/common'
import styles from './CardForm.module.less'

const { Item: FormItem } = Form

// prettier-ignore
const cardInputClasses = [
  'ant-input',
  'ant-input-lg',
  styles.creditCard,
].join(' ')

// eslint-disable-next-line react/prop-types
const CardForm = ({ stripe, amount, currency }) => {
  const { t } = useTranslation()

  function onPay(e) {
    e.preventDefault()
    console.log(stripe)
  }

  return (
    <Form onSubmit={onPay}>
      <FormItem required label={t('Card Details')}>
        <CardElement className={cardInputClasses} />
      </FormItem>
      <div style={{ textAlign: 'center' }}>
        <SubmitButton>
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
}

CardForm.defaultProps = {
  amount: 0.0,
  currency: '$',
}
