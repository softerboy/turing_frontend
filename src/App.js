import React, { useState } from 'react'
import { Button } from 'antd'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <Button onClick={() => setCount(count + 1)}>
      You clicked {count} time
    </Button>
  )
}

export default App
