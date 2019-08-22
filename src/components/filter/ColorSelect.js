/* eslint-disable camelcase */
import React from 'react'
import * as PropTypes from 'prop-types'

import BaseSelect from './BaseSelect'
import styles from './Filter.module.less'

const ColorSelect = props => {
  const { colors, multiple, defaultColorIds, onChange } = props

  const renderColor = (item, isSelected) => {
    const { colorItemContainer, selected } = styles

    const clazzName = isSelected
      ? `${colorItemContainer} ${selected}`
      : `${colorItemContainer}`

    // make white color visible
    const border = /white/i.test(item.value) ? '1px solid #969696' : 'none'
    return (
      <div className={clazzName}>
        <div style={{ backgroundColor: item.value, border }} />
      </div>
    )
  }

  const defaultColors = colors.filter(({ color_id }) =>
    defaultColorIds.includes(color_id),
  )

  return (
    <BaseSelect
      renderItem={renderColor}
      items={colors}
      itemKey="color_id"
      multiple={multiple}
      defaultItems={defaultColors}
      onChange={onChange}
    />
  )
}

export default ColorSelect

const propTypeColor = PropTypes.arrayOf(
  PropTypes.shape({
    color_id: PropTypes.number.isRequired,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
  }),
)

ColorSelect.propTypes = {
  colors: propTypeColor,
  multiple: PropTypes.bool,
  defaultColorIds: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
}

ColorSelect.defaultProps = {
  colors: [],
  defaultColorIds: [],
  multiple: false,
  onChange: null,
}
