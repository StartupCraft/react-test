import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { NavLink } from 'react-router-dom'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

import { useQuery } from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'
import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST, ROOT } from 'Router/routes'

import {
  Back,
  Column,
  Container,
  PostAuthor,
  PostBody,
  PostComment,
  PostContainer,
} from './styles'

const SortableContainer = sortableContainer(({ children }) => (
  <div>{children}</div>
))

const SortableItem = sortableElement(({ value }) => (
  <PostComment mb={2}>{value}</PostComment>
))

function Post() {
  const [comments, setComments] = useState([])
  const history = useHistory()
  const { params } = useRouteMatch()
  const postId = parseInt(params.postId, 10)

  const handleClick = () => history.push(ROOT)

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments, oldIndex, newIndex))
  }

  const { data, loading } = useQuery(postQuery, { variables: { id: postId } })
  const postsQueryResult = useQuery(postsQuery)
  const maxPostId = postsQueryResult.data?.posts.meta.totalCount || postId

  const post = data?.post || {}

  useEffect(() => {
    if (post.comments) {
      setComments(post.comments.data)
    }
  }, [post])

  if (postId > maxPostId) {
    return (
      <Container>
        <Column>
          <Back onClick={handleClick}>Back</Back>
        </Column>
        <h3>
          There is no post with ID: {postId}
          <br />
          Post ID should be lower then {maxPostId}
        </h3>
      </Container>
    )
  }

  return (
    <Container>
      <Column>
        <Back onClick={handleClick}>Back</Back>
      </Column>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Column>
            <h4>Need to add next/previous links</h4>
            <PostContainer key={post.id}>
              <h3>{post.title}</h3>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody mt={2}>{post.body}</PostBody>
            </PostContainer>
            <div>
              {postId > 1 && (
                <NavLink href={POST(postId - 1)} to={POST(postId - 1)}>
                  Prev post
                </NavLink>
              )}
              <br />
              {postId < maxPostId && (
                <NavLink href={POST(postId + 1)} to={POST(postId + 1)}>
                  Next post
                </NavLink>
              )}
            </div>
          </Column>

          <Column>
            <h4>Correct sorting</h4>
            Comments:
            <SortableContainer onSortEnd={handleSortEnd}>
              {comments.map((comment, index) => (
                <SortableItem
                  index={index}
                  key={comment.id}
                  mb={3}
                  value={comment.body}
                />
              ))}
            </SortableContainer>
          </Column>
        </>
      )}
    </Container>
  )
}

export default Post
