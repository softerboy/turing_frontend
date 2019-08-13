import React from 'react'
import * as PropTypes from 'prop-types'
import { Button } from 'antd'

import BaseSelect from './BaseSelect'
import styles from './Filter.module.less'

const SizeSelect = props => {
  const { sizes, defaultSizes, multiple, onChange } = props

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

  return (
    <BaseSelect
      items={sizes}
      renderItem={renderSize}
      multiple={multiple}
      defaultItems={defaultSizes}
      itemKey="id"
      onChange={onChange}
    />
  )
}

export default SizeSelect

const propTypeSize = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
)

SizeSelect.propTypes = {
  sizes: propTypeSize,
  defaultSizes: propTypeSize,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
}

SizeSelect.defaultProps = {
  sizes: [],
  defaultSizes: [],
  multiple: false,
  onChange: null,
}
