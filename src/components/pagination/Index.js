/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon, Pagination } from 'antd'

import './Pagination.less'

const { t } = useTranslation()

function itemRender(current, type, originalElement) {
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

const Index = () => {
  return <Pagination total={101} itemRender={itemRender} />
}

export default Index
