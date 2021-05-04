import React from 'react'

function ExpensiveTree() {
  const now = performance.now()
  while (performance.now() - now < 100) {
    // Emulate some expensive calculations which takes 300ms
    // it can kill stack
    // let res = ''
    // for (let i = 0; i < 100000000; i += 1) {
    //   res = `${Math.random() * i}`
    // }
    // return res
  }
  return <div />
}

export default ExpensiveTree
