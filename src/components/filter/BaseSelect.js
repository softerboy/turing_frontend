import React, { useState, useImperativeHandle, useEffect } from 'react'
import * as PropTypes from 'prop-types'

const BaseSelect = (props, ref) => {
  const {
    multiple,
    items,
    renderItem,
    onChange,
    defaultItems,
    itemKey,
    block,
  } = props

  let initialSelected = []
  if (defaultItems && defaultItems.length) {
    if (multiple) {
      initialSelected = defaultItems
    } else {
      initialSelected = [defaultItems[0]]
    }
  }

  const [selected, setSelected] = useState(initialSelected)

  useEffect(() => {
    setSelected(defaultItems)
  }, [defaultItems])

  useImperativeHandle(ref, () => ({
    getSelected: () => selected,
  }))

  const onItemClick = (e, item, alreadyExists) => {
    e.preventDefault()

    let newSelected = []
    if (alreadyExists) {
      // predicate for filtering selected items
      // for primitive types comparing items is same
      // as comparing item values itself
      let predicate = i => i !== item

      // for not primitive object types,
      // predicate compares items with given unique key property
      if (item && typeof item === 'object') {
        if (itemKey) predicate = i => i[itemKey] !== item[itemKey]
        else
          throw new Error(
            'You should provide an unique key property name for object items,' +
              ' this property key internally used by ' +
              'component for comparing object types',
          )
      }

      // remove from selected if already exists
      if (multiple) newSelected = selected.filter(predicate)
      // set to not selected (i.e. empty array) if "multiple" prop is off
      else newSelected = []
    } else if (multiple) {
      newSelected = [...selected, item]
    } else {
      // there's only one item if "multiple" prop is off
      newSelected = [item]
    }

    setSelected(newSelected)
    // fire onChange event with a new value
    if (onChange) onChange(multiple ? newSelected : newSelected[0])
  }

  const renderMap = (item, index) => {
    let findPredicate = i => i === item

    if (item && typeof item === 'object')
      findPredicate = i => i[itemKey] === item[itemKey]

    const isSelected = selected.some(findPredicate)

    if (block) {
      return (
        // eslint-disable-next-line
        <div key={index} onClick={e => onItemClick(e, item, isSelected)}>
          {renderItem(item, isSelected)}
        </div>
      )
    }

    return (
      // eslint-disable-next-line
      <span key={index} onClick={e => onItemClick(e, item, isSelected)}>
        {renderItem(item, isSelected)}
      </span>
    )
  }

  return items.map(renderMap)
}

export default React.forwardRef(BaseSelect)

BaseSelect.propTypes = {
  multiple: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.any),
  renderItem: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  defaultItems: PropTypes.arrayOf(PropTypes.any),
  itemKey: PropTypes.string,
  block: PropTypes.bool,
}

BaseSelect.defaultProps = {
  multiple: false,
  items: [],
  onChange: null,
  defaultItems: [],
  itemKey: null,
  block: false,
}
