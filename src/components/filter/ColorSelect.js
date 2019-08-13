import React from 'react'
import * as PropTypes from 'prop-types'

import BaseSelect from './BaseSelect'
import styles from './Filter.module.less'

const ColorSelect = props => {
  const { colors, multiple, defaultColors, onChange } = props

  const renderColor = (item, isSelected) => {
    const { colorItemContainer, selected } = styles

    const clazzName = isSelected
      ? `${colorItemContainer} ${selected}`
      : `${colorItemContainer}`

    return (
      <div className={clazzName}>
        <div style={{ backgroundColor: item.value }} />
      </div>
    )
  }

  return (
    <BaseSelect
      renderItem={renderColor}
      items={colors}
      itemKey="id"
      multiple={multiple}
      defaultItems={defaultColors}
      onChange={onChange}
    />
  )
}

export default ColorSelect

const propTypeColor = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
  }),
)

ColorSelect.propTypes = {
  colors: propTypeColor,
  multiple: PropTypes.bool,
  defaultColors: propTypeColor,
  onChange: PropTypes.func,
}

ColorSelect.defaultProps = {
  colors: [],
  defaultColors: [],
  multiple: false,
  onChange: null,
}
