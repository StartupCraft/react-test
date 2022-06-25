import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { PostComment } from './styles'

// correct usage is arrayMove(input, fromIndex, toIndex) - Could not find any other issues with sorting
function PostComments({ data }) {
  const [comments, setComments] = useState([])
  const SortableContainer = sortableContainer(({ children }) => (
    <div>{children}</div>
  ))

  const SortableItem = sortableElement(({ value }) => (
    <PostComment mb={2}>{value}</PostComment>
  ))

  useEffect(() => {
    setComments(data, [data])
  }, [data])

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments, oldIndex, newIndex))
  }

  return (
    <>
      <h4>Incorrect sorting</h4>
      <div>
        Comments:
        {comments !== undefined && comments.length > 0 ? (
          <SortableContainer onSortEnd={handleSortEnd}>
            {comments.map((comment, index) => (
              <SortableItem
                index={index}
                key={index}
                mb={3}
                value={comment.body}
              />
            ))}
          </SortableContainer>
        ) : (
          ' No Comments'
        )}
      </div>
    </>
  )
}

PostComments.propTypes = {
  data: PropTypes.array.isRequired,
}

export default PostComments
