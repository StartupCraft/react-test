import React, { useRef, useState } from 'react'

const Closures = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)
  countRef.current = count
  // No Need to delay for alert
  function handleAlertClick() {
    alert(`You clicked ${count} times`)
  }

  return (
    <>
      <h4>Closures</h4>
      <p>You clicked {countRef.current} times</p>
      <button
        type="button"
        onClick={() => setCount(prevCount => prevCount + 1)}
      >
        Click me
      </button>
      <button type="button" onClick={handleAlertClick}>
        Show alert
      </button>
    </>
  )
}
export default Closures
