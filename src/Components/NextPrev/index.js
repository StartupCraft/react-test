import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { POST } from 'Router/routes'

import { Container } from './style'

const NextPrev = ({ postId }) => (
  <Container>
    <div>
      {postId > 1 && (
        <NavLink href={POST(Number(postId) - 1)} to={POST(Number(postId) - 1)}>
          Back
        </NavLink>
      )}
    </div>
    <div>
      {postId < 100 && (
        <NavLink href={POST(Number(postId) + 1)} to={POST(Number(postId) + 1)}>
          Next
        </NavLink>
      )}
    </div>
  </Container>
)
NextPrev.defaultProps = {
  postId: '',
}
NextPrev.propTypes = {
  postId: PropTypes.string,
}

export default NextPrev
