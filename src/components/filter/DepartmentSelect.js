/* eslint-disable camelcase */
import React from 'react'
import * as PropTypes from 'prop-types'
import { Typography } from 'antd'

import CategorySelect from './CategorySelect'

const { Text } = Typography

const refSet = new Set()

const DepartmentSelect = props => {
  const { departments, onChange } = props

  const onCategoryChange = () => {
    // if setImmediate doesn't used here, ref.getCategories() returns old selected
    // category list, because React.setState() is asynchronous, and it takes time
    setImmediate(() => {
      if (onChange) {
        let selectedCategories = []
        refSet.forEach(ref => {
          selectedCategories = selectedCategories.concat(ref.getCategories())
        })

        onChange(new Set(selectedCategories))
      }
    })
  }

  return departments.map(
    ({ name, categories, defaultCategories, department_id }) => (
      <div style={{ marginBottom: 16 }} key={department_id}>
        <Text strong>{name}</Text>
        <hr />
        <CategorySelect
          ref={elem => refSet.add(elem)}
          categories={categories}
          defaultCategories={defaultCategories}
          onChange={onCategoryChange}
        />
      </div>
    ),
  )
}

export default DepartmentSelect

const propTypeCategory = PropTypes.shape({
  category_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

DepartmentSelect.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      department_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(propTypeCategory),
      defaultCategories: PropTypes.arrayOf(propTypeCategory),
    }),
  ),

  onChange: PropTypes.func,
}

DepartmentSelect.defaultProps = {
  departments: [],
  onChange: null,
}
