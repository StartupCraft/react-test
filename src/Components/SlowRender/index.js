import React, { useState } from 'react'

import ExpensiveTree from '../ExpensiveTree'

const SlowRender = () => {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')

  const handleAlertClick = () => {
    setTimeout(() => {
      alert(`You clicked ${count} times`)
    }, 2500)
  }

  return (
    <>
      <h4>Slow rendering</h4>
      <label>
        Enter something here:
        <br />
        <input
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </label>
      <p>So slow...</p>
      <ExpensiveTree />

      <h4>Closures</h4>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button type="button" onClick={handleAlertClick}>
        Show alert
      </button>
    </>
  )
}

export default SlowRender
