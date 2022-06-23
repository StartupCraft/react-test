import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import { useLocation } from 'react-router-dom'
import arrayMove from 'array-move'
import PostNavigation from './PostNavigation'

import {
  Column,
  PostAuthor,
  PostBody,
  PostContainer,
  PostComment,
} from './styles'

function PostDisplay({ data, posts, postId }) {
  const [comments, setComments] = useState([])
  const location = useLocation()
  const currentIndex =
    location?.state?.posts?.findIndex(id => id === postId) ?? -1
  const prevId =
    currentIndex !== -1 && currentIndex > 0 ? posts[currentIndex - 1] : '-1'
  const nextId =
    currentIndex !== -1 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : '-1'
  const prevNextHidden = posts === undefined

  const SortableContainer = sortableContainer(({ children }) => (
    <div>{children}</div>
  ))

  const SortableItem = sortableElement(({ value }) => (
    <PostComment mb={2}>{value}</PostComment>
  ))

  useEffect(() => {
    setComments(data?.post?.comments?.data ?? [])
  }, [data])

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    // JP - 06/21/2022:
    // correct usage is arrayMove(input, fromIndex, toIndex)
    // Unable to find any other sorting issues
    setComments(arrayMove(comments, oldIndex, newIndex))
  }

  return (
    <>
      <Column>
        <h4>Need to add next/previous links</h4>
        <PostContainer key={data?.post?.id ?? ''}>
          <h3>{data?.post?.title ?? ''}</h3>
          <PostAuthor>by {data?.post?.user?.name ?? ''}</PostAuthor>
          <PostBody mt={2}>{data?.post?.body ?? ''}</PostBody>
        </PostContainer>
        <PostNavigation
          hidden={prevNextHidden}
          nextId={nextId}
          posts={posts}
          previousId={prevId}
        />
      </Column>
      <Column>
        <h4>Incorrect sorting</h4>
        Comments:
        <SortableContainer onSortEnd={handleSortEnd}>
          {comments.map((comment, index) => (
            <SortableItem
              index={parseInt(comment.id, 2)}
              key={index}
              mb={3}
              value={comment.body}
            />
          ))}
        </SortableContainer>
      </Column>
    </>
  )
}

PostDisplay.propTypes = {
  data: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
}

export default PostDisplay
