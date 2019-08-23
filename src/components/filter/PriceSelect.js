import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Slider } from 'antd'
import * as PropTypes from 'prop-types'

import { AppContext } from '../context/AppContext'

const PriceSelect = (props, ref) => {
  const { max, min, defaultPrice, onChange } = props
  const [value, setValue] = useState(defaultPrice)
  const { currency } = useContext(AppContext)

  useEffect(() => {
    if (defaultPrice && defaultPrice.length) {
      setValue(defaultPrice)
    } else {
      setValue([min, max])
    }
  }, [defaultPrice, min, max])

  useImperativeHandle(ref, () => ({
    getSelectedPrice: () => value,
  }))

  const marks = {
    [min]: `${currency}${min}`,
    [max]: `${currency}${max}`,
  }

  const onPriceChange = newValue => {
    setValue(newValue)
    if (onChange) onChange(newValue)
  }

  return (
    <Slider
      range
      marks={marks}
      max={max}
      min={min}
      value={value}
      onChange={onPriceChange}
    />
  )
}

export default forwardRef(PriceSelect)

PriceSelect.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  defaultPrice: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
}

PriceSelect.defaultProps = {
  max: 0,
  min: 0,
  defaultPrice: [],
  onChange: () => {}, // noop
}
