import React, { useEffect, useState, useMemo } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

import { useQuery } from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'
import totalCountQuery from "GraphQL/Queries/totalCount.graphql"

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
  const history = useHistory()
  const { params: { postId } } = useRouteMatch()

  const handleClick = () => history.push(ROOT)

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments, oldIndex, newIndex))
  }

  const { data, loading } = useQuery(postQuery, { variables: { id: postId } })
  const { data: metaData, loading: metaDataLoading } = useQuery(totalCountQuery)

  const totalCount = metaData?.posts.meta.totalCount

  const post = useMemo(() => data?.post || {}, [data?.post.id])

  function handleNext (e) {
    if (Number(postId) < totalCount)
      history.push(`/posts/${Number(postId) + 1}`)
  }

  function handlePrev (e) {
    if (Number(postId) > 1)
      history.push(`/posts/${Number(postId) - 1}`)
  }

  useEffect(() => {
    setComments(post.comments?.data || [])
  }, [post])

  return (
    <Container>
      <Column>
        <Back onClick={handleClick}>Back</Back>
      </Column>
      {loading || metaDataLoading ? (
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
