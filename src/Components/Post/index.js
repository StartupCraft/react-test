import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

import { useQuery } from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'

import { ROOT } from 'Router/routes'

import {
  Back,
  Column,
  Container,
  PostAuthor,
  PostBody,
  PostComment,
  PostContainer,
} from './styles'
import { fa, tr } from "faker/lib/locales"

const SortableContainer = sortableContainer(({ children }) => (
  <div>{children}</div>
))

const SortableItem = sortableElement(({ value }) => (
  <PostComment mb={2}>{value}</PostComment>
))

function Post () {
  const [comments, setComments] = useState([])
  const [postState, setPostState] = useState({})
  const history = useHistory()
  const { params: { postId } } = useRouteMatch()

  const handleClick = () => history.push(ROOT)

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments, oldIndex, newIndex))
  }

  const { data, loading } = useQuery(postQuery, { variables: { id: postId } })

  const post = data?.post || {}

  function handleNext (e) {
    history.push(`/posts/${Number(post.id) + 1}`)
  }

  function handlePrev (e) {
    history.push(`/posts/${Number(post.id) - 1}`)
  }

  const postObjIsReady = !(Object.keys(post).length === 0)

  useEffect(() => {
    if (postObjIsReady)
      setPostState(post)
  }, [postObjIsReady, post.id])

  useEffect(() => {
    setComments(post.comments?.data || [])
  }, [postState])


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
            <div>Next/prev here</div>

            <button
              type="submit"
              onClick={handlePrev}
            >
              Previous
            </button>
            <button
              type="submit"
              onClick={handleNext}
            >
              Next
            </button>
          </Column>

          <Column>
            <h4>Incorrect sorting</h4>
            Comments:
            <SortableContainer onSortEnd={handleSortEnd}>
              {comments
                .map((comment, index) => (
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
