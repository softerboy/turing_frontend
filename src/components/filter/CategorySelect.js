/* eslint-disable camelcase */
import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import * as PropTypes from 'prop-types'
import { Checkbox, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import BaseSelect from './BaseSelect'

const { Text } = Typography

const CategorySelect = (
  { categories, defaultCategoryIds = [], onChange },
  ref,
) => {
  const baseSelectRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getCategories() {
      return baseSelectRef.current.getSelected()
    },
  }))

  const { t } = useTranslation()

  const renderItem = (item, isSelected) => {
    if (typeof item === 'string') {
      // item is header
      return (
        <div style={{ marginTop: 16 }}>
          <Text>{item}</Text>
          <hr style={{ border: '0.5px solid #e8e8e8' }} />
        </div>
      )
    }

    if (typeof item === 'object') {
      // item is category object
      return <Checkbox checked={isSelected}>{t(item.name)}</Checkbox>
    }

    return null
  }

  const defaultCategories = categories.filter(({ category_id }) =>
    defaultCategoryIds.includes(category_id),
  )

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
  defaultCategoryIds: PropTypes.arrayOf(PropTypes.number),
}

CategorySelect.defaultProps = {
  categories: [],
  onChange: null,
  defaultCategoryIds: [],
}
