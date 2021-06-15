import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'

const Field = ({ name, id, comment, handleCommentChange }) => {
  const handleInputChange = useCallback(
    e => {
      handleCommentChange(e.target.value, id)
    },
    [id, handleCommentChange],
  )

  return (
    <>
      <li>
        {name}:<br />
        <input type="text" value={comment} onChange={handleInputChange} />
      </li>
    </>
  )
}

Field.propTypes = {
  comment: PropTypes.string.isRequired,
  handleCommentChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default memo(Field)
