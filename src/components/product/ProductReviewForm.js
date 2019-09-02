/* eslint-disable react/prop-types */
import React from 'react'
import { Row, Col, Form, Input, Typography, Button, Rate } from 'antd'
import { useTranslation } from 'react-i18next'

const { Title } = Typography
const { TextArea } = Input
const { Item: FormItem } = Form

const ProductReviewForm = props => {
  const {
    form: { getFieldDecorator },
    loading,
  } = props
  const { t } = useTranslation()

  function getReviewTextarea() {
    const tip = t('Your review must be at least 50 character')
    return (
      <>
        {getFieldDecorator('review', {
          rules: [
            {
              trigger: 'submit',
              required: true,
              // eslint-disable-next-line quotes
              message: t("Review can't be empty"),
            },
            {
              trigger: 'submit',
              min: 50,
              message: tip,
            },
          ],
        })(<TextArea rows={6} />)}
      </>
    )
  }

  const onSubmit = e => {
    e.preventDefault()

    const {
      form: { validateFieldsAndScroll },
    } = props

    validateFieldsAndScroll((err, values) => {
      if (!err && props.onSubmit) {
        props.onSubmit(values)
      }
    })
  }

  return (
    <Row>
      <Col md={{ span: 18, offset: 3 }}>
        <div style={{ clear: 'both', margin: '35px 0' }} />
        <Title level={3}>{t('Add a review')}</Title>
        <Form
          onSubmit={onSubmit}
          layout="vertical"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <FormItem label={t('Your review')}>{getReviewTextarea()}</FormItem>

          <FormItem label={t('Overall rating')}>
            {getFieldDecorator('rating', { initialValue: 0 })(<Rate />)}
          </FormItem>

          <FormItem wrapperCol={{ md: { span: 12, offset: 6 } }}>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
            >
              {t('Submit')}
            </Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  )
}

export default Form.create({ name: 'review-form' })(ProductReviewForm)
