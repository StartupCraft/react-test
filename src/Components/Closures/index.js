import React, { useEffect, useState } from 'react'

// Used state to fix closure issue with show alert, alternate solution would be useRef but I thought this was cleaner and offered better user feedback
function Closures() {
  const [count, setCount] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [alertEnabled, setAlertEnabled] = useState(true)

  useEffect(() => {
    if (showAlert) {
      setShowAlert(false)
      alert(`You clicked ${count} times`)
      setAlertEnabled(true)
    }
  })

  function handleAlertClick() {
    setAlertEnabled(false)
    setTimeout(() => {
      setShowAlert(true)
    }, 2500)
  }

  return (
    <>
      <h4>Closures</h4>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button disabled={!alertEnabled} type="button" onClick={handleAlertClick}>
        {alertEnabled ? 'Show alert...' : 'Processing...'}
      </button>
    </>
  )
}

export default Closures
