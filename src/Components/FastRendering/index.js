import React, { useState } from 'react'

const FastRendering = () => {
  const [value, setValue] = useState('')

  return (
    <>
      <h4>
        <s>Slow</s> 🏃‍♂️ rendering
      </h4>
      <label>
        Enter something here:
        <br />
        <input value={value} onInput={({ target }) => setValue(target.value)} />
      </label>
    </>
  )
}

export default FastRendering
