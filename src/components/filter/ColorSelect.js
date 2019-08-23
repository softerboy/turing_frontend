/* eslint-disable camelcase */
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import * as PropTypes from 'prop-types'

import BaseSelect from './BaseSelect'
import styles from './Filter.module.less'

const ColorSelect = (props, ref) => {
  const { colors, multiple, defaultColorIds = [], onChange } = props
  const baseSelectRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getSelectedColors: () => baseSelectRef.current.getSelected(),
  }))

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
      ref={baseSelectRef}
      renderItem={renderColor}
      items={colors}
      itemKey="color_id"
      multiple={multiple}
      defaultItems={defaultColors}
      onChange={onChange}
    />
  )
}

export default forwardRef(ColorSelect)

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
