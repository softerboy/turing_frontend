/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import Filter from './Filter'
import FILTER_QUERY from '../../graphql/filter-query.graphql'
import { queryStringToDefaultValues } from '../../common/utils'

const FilterRenderer = ({ location }) => {
  const { data, error, loading } = useQuery(FILTER_QUERY)
  const [defaultValues, setDefaultValues] = useState({})

  useEffect(() => {
    const values = queryStringToDefaultValues(location.search)
    setDefaultValues(values)
  }, [location.search])

  // TODO: replace with loading component
  if (loading) return <div>Loading</div>

  // TODO: replace with error placeholder component
  if (error) return <div>Ups :-( {JSON.stringify(error)}</div>

  const categories = data.departments.reduce((acc, curr) => {
    return acc.concat([curr.name]).concat(curr.categories)
  }, [])

  // eslint-disable-next-line no-unused-vars
  const handleFilterChange = filterData => {}

  return (
    <Filter
      {...data}
      {...defaultValues}
      categories={categories}
      onChange={handleFilterChange}
    />
  )
}

export default withRouter(FilterRenderer)