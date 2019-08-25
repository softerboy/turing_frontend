/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Icon, Pagination, Row, Select, Typography } from 'antd'

import './Pagination.less'

const { Option } = Select
const { Text } = Typography

const sortOptions = [
  {
    value: 'category',
    label: 'Category',
  },
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'price',
    label: 'Price',
  },
]

const Index = () => {
  const [sort, setSort] = useState()
  const [range, setRange] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { t } = useTranslation()

  const itemRender = (curr, type, originalElement) => {
    if (type === 'prev') {
      return (
        <span>
          <Icon type="left" className="arrowIcon" />
          <a className="prevLabel">{t('Back')}</a>
        </span>
      )
    }

    if (type === 'next') {
      return (
        <span>
          <a className="nextLabel">{t('Forward')}</a>
          <Icon type="right" className="arrowIcon" />
        </span>
      )
    }

    return originalElement
  }

  const showTotal = (total, currentRange) => {
    if (currentRange[0] !== range[0] && currentRange[1] !== range[1])
      setRange(currentRange)
  }

  const onChange = page => {
    setCurrent(page)
  }

  const onShowSizeChange = (page, size) => {
    setCurrent(page)
    setPageSize(size)
  }

  return (
    <div>
      <Row>
        <Col span={8}>
          <Select
            style={{ width: 120, float: 'left' }}
            placeholder={t('Sort by')}
            value={sort}
            onChange={val => setSort(val)}
          >
            {sortOptions.map(({ value, label }) => (
              <Option key={value} value={value}>
                {t(label)}
              </Option>
            ))}
          </Select>
        </Col>

        <Col style={{ textAlign: 'center', lineHeight: '32px' }} span={8}>
          <Text strong>
            {t('View')}: {range[0]}
          </Text>{' '}
          | {range[1]}
        </Col>

        <Col span={8}>
          <Pagination
            current={current}
            className="paginationSecondary"
            total={101}
            showQuickJumper
            showSizeChanger
            style={{ float: 'right' }}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col className="paginationMain">
          <Pagination
            current={current}
            total={101}
            pageSize={pageSize}
            itemRender={itemRender}
            showTotal={showTotal}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Index
