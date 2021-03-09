import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

import { useQuery } from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'

import { POST, ROOT } from 'Router/routes'

import {
  Back,
  Column,
  Container,
  PostAuthor,
  PostBody,
  PostComment,
  PostContainer,
  PostNav,
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
  const {
    params: { postId },
  } = useRouteMatch()

  const handleClick = () => history.push(ROOT)

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments, oldIndex, newIndex))
  }

  const { data, loading } = useQuery(postQuery, { variables: { id: postId } })

  const post = data?.post || {}

  useEffect(() => {
    setComments(post.comments?.data)
  }, [post])

  const handleNextPost = useCallback(() => {
    history.push(POST(+postId + 1))
  }, [postId])

  const handlePrevPost = useCallback(() => {
    history.push(POST(+postId - 1))
  }, [postId])

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
            <PostNav mt={30}>
              <button
                disabled={postId === '1'}
                type="button"
                onClick={handlePrevPost}
              >
                Prev Post
              </button>
              <button
                disabled={postId === '100'}
                type="button"
                onClick={handleNextPost}
              >
                Next Post
              </button>
            </PostNav>
          </Column>

          <Column>
            <h4>Looks correct</h4>
            Comments:
            <SortableContainer items={comments} onSortEnd={handleSortEnd}>
              {comments?.map((comment, index) => (
                <SortableItem
                  index={index}
                  key={`${comment}-${comment.body}`}
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
