import React, { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import { Container } from './styles'

// This code is suspect. Consult with design team about intended functionality
function Ticker() {
  const testStart = useRef(DateTime.local())
  const [time, setTime] = useState(
    DateTime.local().diff(testStart.current).toFormat('hh:mm:ss'),
  )

  useEffect(() => {
    testStart.current = DateTime.fromISO(localStorage.getItem('test-start'))

    if (!testStart.current.isValid) {
      testStart.current = DateTime.local()
      localStorage.setItem('test-start', testStart.current.toISO())
    }

    setInterval(() => {
      setTime(DateTime.local().diff(testStart.current).toFormat('hh:mm:ss'))
    }, 1000)
  }, [])

  return <Container>Viewing this test: {time}</Container>
}

export default Ticker
