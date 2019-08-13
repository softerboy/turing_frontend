/* eslint-disable camelcase */
import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import * as PropTypes from 'prop-types'
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'

import BaseSelect from './BaseSelect'

const CategorySelect = ({ categories, defaultCategories, onChange }, ref) => {
  const baseSelectRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getCategories() {
      return baseSelectRef.current.getSelected()
    },
  }))

  const { t } = useTranslation()

  const renderItem = (category, isSelected) => {
    return <Checkbox checked={isSelected}>{t(category.name)}</Checkbox>
  }

  return (
    <BaseSelect
      ref={baseSelectRef}
      itemKey="category_id"
      onChange={onChange}
      renderItem={renderItem}
      items={categories}
      defaultItems={defaultCategories}
      multiple
      block
    />
  )
}

export default forwardRef(CategorySelect)

const propTypeCategories = PropTypes.arrayOf(
  PropTypes.shape({
    category_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
)

// prettier-ignore
CategorySelect.propTypes = {
  categories: propTypeCategories,
  onChange: PropTypes.func,
  defaultCategories: propTypeCategories,
}

CategorySelect.defaultProps = {
  categories: [],
  onChange: null,
  defaultCategories: [],
}
