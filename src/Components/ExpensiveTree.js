import React from 'react'

const ExpensiveTree = React.memo(() => {
  const now = performance.now()
  while (performance.now() - now < 100) {
    // Emulate some expensive calculations which takes 300ms
  }
  return <div />
})

export default ExpensiveTree
