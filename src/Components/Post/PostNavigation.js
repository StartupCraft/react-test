import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'

import { POST } from 'Router/routes'

import { PrevButton, NextButton } from './styles'

function PostNavigation({ nextId, previousId, posts }) {
  const history = useHistory()

  const onPreviousClicked = () => {
    if (previousId !== -1) {
      history.push(POST(previousId), { posts })
    }
  }

  const onNextClicked = () => {
    if (nextId !== -1) {
      history.push(POST(nextId), { posts })
    }
  }

  const previousDisabled = posts.length === 0 || previousId === '-1'
  const nextDisabled = posts.length === 0 || nextId === '-1'
  const prevNextHidden = posts.length === 0

  return (
    <div hidden={prevNextHidden}>
      <PrevButton
        disabled={previousDisabled}
        type="button"
        onClick={onPreviousClicked}
      >
        Previous
      </PrevButton>
      <NextButton
        disabled={nextDisabled}
        type="button"
        onClick={onNextClicked}
      >
        Next
      </NextButton>
    </div>
  )
}

PostNavigation.propTypes = {
  nextId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  previousId: PropTypes.string.isRequired,
}

export default PostNavigation
