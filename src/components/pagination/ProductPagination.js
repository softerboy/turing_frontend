/* eslint-disable jsx-a11y/anchor-is-valid, react/destructuring-assignment */
import React, { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Col, Icon, Pagination, Row, Select, Typography } from 'antd'

import './Pagination.less'

const { Option } = Select
const { Text } = Typography

const ProductPagination = props => {
  const [sort, setSort] = useState(props.sort)
  const [range, setRange] = useState(props.range)
  const [current, setCurrent] = useState(props.current)
  const [pageSize, setPageSize] = useState(props.pageSize)

  const { t } = useTranslation()

  useEffect(() => {
    setSort(props.sort)
    setPageSize(props.pageSize)
    setCurrent(props.current)
    setPageSize(props.pageSize)
  }, [props])

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
            {props.sortOptions.map(({ value, label }) => (
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
            total={props.total}
            showQuickJumper
            showSizeChanger
            style={{ float: 'right' }}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            pageSize={pageSize}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col className="paginationMain">
          <Pagination
            current={current}
            total={props.total}
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

export default ProductPagination

ProductPagination.propTypes = {
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),

  total: PropTypes.number,
  sort: PropTypes.string,
  range: PropTypes.arrayOf(PropTypes.number),
  current: PropTypes.number,
  pageSize: PropTypes.number,
}

ProductPagination.defaultProps = {
  sortOptions: [],

  total: 0,
  sort: undefined,
  range: [],
  current: 1,
  pageSize: 10,
}
