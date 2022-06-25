import React, { useState } from 'react'
import ExpensiveTree from '../ExpensiveTree'

function SlowRendering() {
  const [value, setValue] = useState('')

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
    </>
  )
}

export default SlowRendering
