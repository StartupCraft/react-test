import React from 'react'
import PropTypes from 'prop-types'
import PostNavigation from './PostNavigation'
import PostComments from './PostComments'

import { Column, PostAuthor, PostBody, PostContainer } from './styles'

function PostDisplay({ data, posts, postId }) {
  const prevNextHidden = posts === undefined

  return (
    <>
      <Column>
        <h4>Need to add next/previous links</h4>
        <PostContainer key={data?.post?.id ?? ''}>
          <h3 id="title">{data?.post?.title ?? ''}</h3>
          <PostAuthor id="author">by {data?.post?.user?.name ?? ''}</PostAuthor>
          <PostBody id="body" mt={2}>
            {data?.post?.body ?? ''}
          </PostBody>
        </PostContainer>
        <PostNavigation hidden={prevNextHidden} postId={postId} posts={posts} />
      </Column>
      <Column>
        <PostComments data={data?.post?.comments?.data ?? []} />
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
