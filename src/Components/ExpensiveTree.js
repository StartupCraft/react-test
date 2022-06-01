import React, { useState, useMemo } from 'react'

function expensiveCalc () {
  const now = performance.now()
  while (performance.now() - now < 100) {
    // Emulate some expensive calculations which takes 300ms
  }
  return "DONE"
}

function ExpensiveTree () {

  const calc = useMemo(() => expensiveCalc(), [])

  return <div>{calc}</div>
}

export default ExpensiveTree
