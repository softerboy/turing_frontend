/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Card } from 'antd'

import Filter from './Filter'
import FILTER_QUERY from '../../graphql/filter-query.graphql'
import {
  filterToQueryString,
  filterPropsFromQueryString,
} from '../../common/utils'
import FilterPlaceholder from './FilterPlaceholder'
import ErrorRenderer from '../ErrorRenderer'

const FilterRenderer = ({ history, hideHeader }) => {
  const { data, error, loading } = useQuery(FILTER_QUERY)
  const [defaultValues, setDefaultValues] = useState({})

  useEffect(() => {
    const values = filterPropsFromQueryString(history.location.search)
    setDefaultValues(values)
  }, [history.location.search])

  if (loading) {
    return (
      <Card>
        <FilterPlaceholder />
      </Card>
    )
  }

  if (error) return <ErrorRenderer error={error} />

  const categories = data.departments.reduce((acc, curr) => {
    return acc.concat([curr.name]).concat(curr.categories)
  }, [])

  // eslint-disable-next-line no-unused-vars
  const handleFilterChange = selectedOptions => {
    const queryString = filterToQueryString(selectedOptions)
    history.push(`/products?${queryString}`)
  }

  return (
    <Filter
      {...data}
      {...defaultValues}
      hideHeader={hideHeader}
      categories={categories}
      onChange={handleFilterChange}
    />
  )
}

export default withRouter(FilterRenderer)
