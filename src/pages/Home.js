/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { Col, Drawer, Icon, Row } from 'antd'
import { useTranslation } from 'react-i18next'

import LayoutMain from '../components/layout/LayoutMain'
import FilterRenderer from '../components/filter/FilterRenderer'
import PaginationRenderer from '../components/pagination/PaginationRenderer'
import ProductGridRenderer from '../components/product/ProductGridRenderer'
import {
  filterPropsFromQueryString,
  paginationPropsFromQueryString,
  searchTermFromQueryString,
} from '../common/utils'
import styles from './Pages.module.less'

const colWidth = {
  // prettier-ignore
  filter:   { xs:  0, sm:  0, md:  0, lg: 6,  xl: 6,  xxl: 4 },
  products: { xs: 24, sm: 24, md: 24, lg: 18, xl: 18, xxl: 20 },
}

/* eslint-disable react/prop-types */
const Home = ({ history }) => {
  const { t } = useTranslation()
  const [total, setTotal] = useState(0)
  const [isFilterModalVisible, setFilterModalVisible] = useState(false)
  const [variables, setVariables] = useState({ page: 1, perPage: 10 })

  useEffect(() => {
    const { search: queryString } = history.location
    const {
      defaultCategoryIds: inCategory,
      defaultColorIds: inColor,
      defaultSizeIds: inSize,
      defaultPrice: inPrice,
    } = filterPropsFromQueryString(queryString)

    const {
      page,
      per_page: perPage,
      sort: sortBy,
    } = paginationPropsFromQueryString(queryString)

    const search = searchTermFromQueryString(queryString)

    const newVariables = {
      inCategory,
      inColor,
      inSize,
      inPrice,
      page,
      perPage,
      sortBy,
      search,
    }

    setVariables(newVariables)
    // eslint-disable-next-line
  }, [history.location.search])

  return (
    <LayoutMain>
      <Row>
        <Drawer
          className={styles.filterDrawer}
          width={300}
          title={t('Filter')}
          placement="left"
          onClose={() => setFilterModalVisible(false)}
          visible={isFilterModalVisible}
        >
          <FilterRenderer hideHeader />
        </Drawer>

        <div
          onKeyDown={() => setFilterModalVisible(true)}
          tabIndex={-11}
          role="button"
          onClick={() => setFilterModalVisible(true)}
          className={styles.filterButton}
        >
          <Icon type="filter" />
        </div>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col style={{ marginBottom: 16 }}>
          <PaginationRenderer total={total} />
        </Col>

        <Col {...colWidth.filter}>
          <FilterRenderer />
        </Col>

        <Col {...colWidth.products}>
          <ProductGridRenderer
            history={history}
            onTotalChanged={setTotal}
            variables={variables}
          />
        </Col>
      </Row>
    </LayoutMain>
  )
}

export default Home
