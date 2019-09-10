import React, { useState } from 'react'
import { Button, Input } from 'antd'
import * as PropTypes from 'prop-types'
import styles from './Counter.module.less'

const Counter = props => {
  const { min, max, onChange, defaultValue, inputKey } = props
  const initialValue =
    defaultValue || (min === Number.MIN_SAFE_INTEGER ? 0 : min)

  const [value, setValue] = useState(initialValue)

  const inc = () => {
    const newValue = value + 1

    if (newValue <= max) {
      setValue(Number(newValue))
      onChange(Number(newValue))
    }
  }

  const dec = () => {
    const newValue = value - 1

    if (newValue >= min) {
      setValue(Number(newValue))
      onChange(Number(newValue))
    }
  }

  const onValueChange = ({ target: { value: curr } }) => {
    let newValue = min
    if (curr >= min && curr <= max) {
      newValue = Number(curr)
    }

    setValue(newValue)
    onChange(newValue)
  }

  return (
    <span>
      <Button
        size="small"
        className={styles.button}
        shape="circle"
        icon="minus"
        onClick={dec}
      />
      <Input
        key={inputKey}
        min={min}
        max={max}
        type="number"
        className={styles.input}
        value={value}
        onChange={onValueChange}
      />
      <Button
        size="small"
        className={styles.button}
        shape="circle"
        icon="plus"
        onClick={inc}
      />
    </span>
  )
}

export default Counter

Counter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  inputKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Counter.defaultProps = {
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  defaultValue: 0,
  onChange: () => {}, // noop
  inputKey: 0,
}
