import React, { useState } from 'react'
import ExpensiveTree from '../ExpensiveTree'

// Because data is missing from Post regarding what the next/prev id is from the server, I opted to pass the posts data to the post via it's state. I can then lookup the next/prev id from the returned list.
// This was the only solution I could think of that wouldn't cause a bad experience by clicking next and finding no post found (due to post being deleted or db id skipping)
// Used state to fix closure issue with show alert, alternate solution would be useRef but I thought this was cleaner and offered better user feedback
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
