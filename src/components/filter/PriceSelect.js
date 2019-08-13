import React, { useContext } from 'react'
import { Slider } from 'antd'
import * as PropTypes from 'prop-types'

import { AppContext } from '../context/AppContext'

const PriceSelect = props => {
  const { max, min, defaultPrice, onChange } = props
  const { currency } = useContext(AppContext)

  const marks = {
    [min]: `${currency}${min}`,
    [max]: `${currency}${max}`,
  }

  return (
    <Slider
      range
      marks={marks}
      max={max}
      min={min}
      defaultValue={defaultPrice}
      onChange={onChange}
    />
  )
}

export default PriceSelect

PriceSelect.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  defaultPrice: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
}

PriceSelect.defaultProps = {
  max: 0,
  min: 0,
  defaultPrice: [0, 0],
  onChange: () => {}, // noop
}
