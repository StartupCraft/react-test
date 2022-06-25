import React from 'react'

let timer = null

// Instead of calculations, emulating a wait() function to create exactly 300ms delay which showcases the lag perfectly
// Wrappin the ExpensiveTree using React Memorize, to prevent unnecessary rendering which solves the slowdown
function ExpensiveTree() {
  const now = performance.now()

  while (performance.now() - now < 100) {
    // Emulate some expensive calculations which takes 300ms
    // Instead of calculations, emulating a wait() function to create exactly 300ms delay which showcases the lag perfectly
    clearTimeout(timer)
    timer = setTimeout(() => {}, 300)
  }
  return <div />
}

export default React.memo(ExpensiveTree)
