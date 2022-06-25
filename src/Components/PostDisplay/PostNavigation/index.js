import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { POST } from 'Router/routes'
import { PrevButton, NextButton } from './styles'

/*
 Usage: Past the current Post.Id {postId} and the array of PostIds {posts}
 Because of limitations with the API we have no way of knowing the previous and next postId
 Solution for now is to pass the list of Post.Ids from the previous list view.
*/

function PostNavigation({ postId, posts }) {
  const history = useHistory()
  const currentIndex = posts?.findIndex(id => id === postId) ?? -1
  const prevId =
    currentIndex !== -1 && currentIndex > 0 ? posts[currentIndex - 1] : '-1'
  const nextId =
    currentIndex !== -1 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : '-1'

  const onPreviousClicked = () => {
    if (prevId !== -1) {
      history.push(POST(prevId), { posts })
    }
  }

  const onNextClicked = () => {
    if (nextId !== -1) {
      history.push(POST(nextId), { posts })
    }
  }

  const previousDisabled = posts.length === 0 || prevId === '-1'
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
      <NextButton disabled={nextDisabled} type="button" onClick={onNextClicked}>
        Next
      </NextButton>
    </div>
  )
}

PostNavigation.propTypes = {
  postId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
}

export default PostNavigation
