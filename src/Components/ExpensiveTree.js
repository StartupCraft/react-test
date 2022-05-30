import React from 'react'

function ExpensiveTree() {
  const now = performance.now()
  while (performance.now() - now < 100) {
    // Emulate some expensive calculations which takes 300ms
    setTimeout(() => {
      console.log('i am exensive')
    }, 300)
  }
  return <div />
}

export default ExpensiveTree
