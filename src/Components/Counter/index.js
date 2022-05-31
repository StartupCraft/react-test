import React, { useCallback, useRef, useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)
  countRef.current = count

  const handleAlertClick = useCallback(() => {
    setTimeout(() => {
      alert(`You clicked ${countRef.current} times`)
    }, 2500)
  }, [countRef])

  return (
    <>
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

export default Counter
