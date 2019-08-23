/* eslint-disable camelcase */
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import * as PropTypes from 'prop-types'
import { Button } from 'antd'

import BaseSelect from './BaseSelect'
import styles from './Filter.module.less'

const SizeSelect = (props, ref) => {
  const { sizes, defaultSizeIds = [], multiple, onChange } = props
  const baseSelectRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getSelectedSizes: () => baseSelectRef.current.getSelected(),
  }))

  // eslint-disable-next-line
  const renderSize = ({ value }, isSelected) => {
    return (
      <Button
        size="small"
        className={styles.sizeButton}
        type={isSelected ? 'primary' : 'default'}
      >
        {value}
      </Button>
    )
  }

  const defaultSizes = sizes.filter(({ size_id }) =>
    defaultSizeIds.includes(size_id),
  )

  return (
    <BaseSelect
      ref={baseSelectRef}
      items={sizes}
      renderItem={renderSize}
      multiple={multiple}
      defaultItems={defaultSizes}
      itemKey="size_id"
      onChange={onChange}
    />
  )
}

export default forwardRef(SizeSelect)

const propTypeSize = PropTypes.arrayOf(
  PropTypes.shape({
    size_id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
)

SizeSelect.propTypes = {
  sizes: propTypeSize,
  defaultSizeIds: PropTypes.arrayOf(PropTypes.number),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
}

SizeSelect.defaultProps = {
  sizes: [],
  defaultSizeIds: [],
  multiple: false,
  onChange: null,
}
