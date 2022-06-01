import React from 'react'
import PropTypes from 'prop-types'

const SlowRendering = ({ value, setValue }) => (
  <>
    <h4>Slow rendering</h4>
    <label>
      Enter something here:
      <br />
      <input value={value} onChange={({ target }) => setValue(target.value)} />
    </label>
    <p>So slow...</p>
    {value}
  </>
)

SlowRendering.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SlowRendering
