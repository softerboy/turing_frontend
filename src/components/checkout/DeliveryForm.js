/* eslint-disable camelcase */
import React, { useState } from 'react'
import { Col, Form, Input, Row, Select, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import * as PropTypes from 'prop-types'

import { getAddressField, getFullNameField, SubmitButton } from '../auth/common'

const { Item: FormItem } = Form
const { Option } = Select
const size = 'large'

const DeliveryForm = props => {
  const { form, onSubmit, shippingRegions } = props
  const { getFieldDecorator } = form
  const [shippingTypes, setShippingTypes] = useState([])

  const { t } = useTranslation()

  function onFormSubmit(e) {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err && onSubmit) {
        onSubmit(values)
      }
    })
  }

  function onRegionSelected(id) {
    form.resetFields(['shipping_type'])
    const found = shippingRegions.find(
      ({ shipping_region_id }) => shipping_region_id === id,
    )

    setShippingTypes(found.shippingTypes)
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <FormItem label={t('Full name')}>
        {getFullNameField(getFieldDecorator, t)}
      </FormItem>

      <FormItem label={t('Address')}>
        {getAddressField(getFieldDecorator, t)}
      </FormItem>

      <Row gutter={16}>
        <Col span={12}>
          <FormItem label={t('City')}>
            {getFieldDecorator('city', {
              rules: [
                {
                  required: true,
                  message: t('Please input your city'),
                },
              ],
            })(<Input size={size} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={t('State')}>
            {getFieldDecorator('state', {
              rules: [
                {
                  required: true,
                  message: t('Please input your state'),
                },
              ],
            })(<Input size={size} />)}
          </FormItem>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <FormItem label={t('Country')}>
            {getFieldDecorator('country', {
              rules: [
                {
                  required: true,
                  message: t('Please select country'),
                },
              ],
            })(<Input size={size} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={t('Zip')}>
            {getFieldDecorator('zip', {
              rules: [
                {
                  required: true,
                  message: t('Please enter your zip'),
                },
              ],
            })(<Input size={size} />)}
          </FormItem>
        </Col>
      </Row>

      <Typography.Title level={4}>{t('Shipping')}</Typography.Title>

      <Row gutter={16}>
        <Col span={12}>
          <FormItem label={t('Region')}>
            {getFieldDecorator('shipping_region_id', {
              rules: [
                {
                  required: true,
                  message: t('Please select a region'),
                },
              ],
            })(
              <Select
                onChange={onRegionSelected}
                placeholder={t('Please select')}
                size={size}
              >
                {shippingRegions.map(
                  ({ shipping_region, shipping_region_id }) => (
                    <Option key={shipping_region_id} value={shipping_region_id}>
                      {shipping_region}
                    </Option>
                  ),
                )}
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={t('Type')}>
            {getFieldDecorator('shipping_id', {
              rules: [
                {
                  required: true,
                  message: t('Please select a shipping type'),
                },
              ],
            })(
              <Select placeholder={t('Please select')} size={size}>
                {shippingTypes.map(({ shipping_type, shipping_id }) => (
                  <Option key={shipping_id} value={shipping_id}>
                    {shipping_type}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
        </Col>
      </Row>

      <FormItem style={{ textAlign: 'center' }}>
        <SubmitButton>{t('Continue to Payment')}</SubmitButton>
      </FormItem>
    </Form>
  )
}

export default Form.create({ name: 'shipping' })(DeliveryForm)

const propTypeShipping = PropTypes.shape({
  shipping_id: PropTypes.number.isRequired,
  shipping_type: PropTypes.string.isRequired,
  shipping_cost: PropTypes.number.isRequired,
  shipping_region_id: PropTypes.number.isRequired,
})

DeliveryForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  shippingRegions: PropTypes.arrayOf(
    PropTypes.shape({
      shipping_region_id: PropTypes.number.isRequired,
      shipping_region: PropTypes.string.isRequired,
      shippingTypes: PropTypes.arrayOf(propTypeShipping),
    }),
  ),
}

DeliveryForm.defaultProps = {
  form: {},
  onSubmit: () => {},
  shippingRegions: [],
}
