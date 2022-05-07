import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

import { useQuery } from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'

import { POST, ROOT } from 'Router/routes'
import { PaginationButton } from '../Root/styles'

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
  const {
    params: { postId },
  } = useRouteMatch()
  const { data, loading } = useQuery(postQuery, { variables: { id: postId } })
  const post = data?.post || {}
  const minPostId = 1;
  const maxPostId = 100;

  const handleClick = () => history.push(ROOT)

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments, oldIndex, newIndex))
  }

  const handlePrevPost = () => {
    history.push(POST(+postId - 1))
  }

  const handleNextPost = () => {
    history.push(POST(+postId + 1))
  }

  useEffect(() => {
    post.comments?.data && setComments(post.comments.data || [])
  }, [post])

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
              <PaginationButton
                isDisabled={+postId === minPostId}
                disabled={+postId === minPostId}
                onClick={handlePrevPost}
              >
                Previous post
              </PaginationButton>
              <PaginationButton
                isDisabled={+postId === maxPostId}
                disabled={+postId === maxPostId}
                onClick={handleNextPost}
              >
                Next post
              </PaginationButton>
            </div>
          </Column>

          <Column>
            <h4>Incorrect sorting</h4>
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
