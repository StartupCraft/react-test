import React from 'react'

function ExpensiveTree() {
  const now = performance.now()
  while (performance.now() - now < 100) {
    // Emulate some expensive calculations which takes 300ms
    // JP - 06-21-22: Instead of calculations, emulating a wait() function to create exactly 300ms delay which showcases the lag perfectly
    setTimeout(() => { }, 300);
  }
  return <div />
}
// JP - 06-21-22: Wrappin the ExpensiveTree using React Memorize, to prevent unnecessary rendering which solves the slowdown
export default React.memo(ExpensiveTree)
