import React from 'react'
import { Card } from 'antd'

import PriceSelect from './PriceSelect'

const FilterMain = () => {
  return (
    <Card title="Filter">
      <PriceSelect />
    </Card>
  )
}

export default FilterMain
