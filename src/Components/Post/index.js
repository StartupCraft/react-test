import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

import { useQuery } from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'
import postsSiblingsQuery from 'GraphQL/Queries/postsSiblings.graphql'

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

import Pagination from '../Pagination'

const SortableContainer = sortableContainer(({ children }) => (
  <div>{children}</div>
))

const SortableItem = sortableElement(({ value }) => (
  <PostComment mb={2}>{value}</PostComment>
))

const Post = () => {
  const [comments, setComments] = useState([])
  const history = useHistory()
  const {
    params: { postId },
  } = useRouteMatch()

  const handleClickBack = () => history.push(ROOT)

  const handleSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      setComments(arrayMove(comments, oldIndex, newIndex))
    },
    [comments],
  )

  const { data, loading } = useQuery(postQuery, { variables: { id: postId } })
  const { data: siblings } = useQuery(postsSiblingsQuery, {
    variables: {
      start: parseInt(postId, 10) - 2 >= 0 ? parseInt(postId, 10) - 2 : 0,
      end: parseInt(postId, 10) + 1,
    },
  })
  const post = data?.post || {}

  const prevDisabled = useMemo(() => {
    const curIndex = siblings?.posts.data.findIndex(x => x.id === `${postId}`)

    return curIndex !== 1
  }, [postId, siblings?.posts.data])

  const nextDisabled = useMemo(() => {
    const curIndex = siblings?.posts.data.findIndex(x => x.id === `${postId}`)
    const nextPost = siblings?.posts.data[curIndex + 1]

    return !nextPost
  }, [postId, siblings?.posts.data])

  const handlePaginationNext = useCallback(() => {
    if (!nextDisabled) {
      history.push(POST(parseInt(postId, 10) + 1))
    }
  }, [postId, nextDisabled])

  const handlePaginationPrev = useCallback(() => {
    if (!prevDisabled) {
      history.push(POST(parseInt(postId, 10) - 1))
    }
  }, [postId, prevDisabled])

  useEffect(() => {
    setComments(post?.comments?.data || [])
  }, [post?.comments?.data])

  const paginationProps = {
    currentPage: parseInt(postId, 10),
    handleNext: handlePaginationNext,
    handlePrev: handlePaginationPrev,
    nextDisabled,
    prevDisabled,
  }

  return (
    <Container>
      <Column>
        <Back onClick={handleClickBack}>Back</Back>
      </Column>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Column>
            <Pagination {...paginationProps} />
            <PostContainer key={post.id}>
              <h3>{post.title}</h3>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody mt={2}>{post.body}</PostBody>
            </PostContainer>
            <Pagination {...paginationProps} />
          </Column>

          <Column>
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
