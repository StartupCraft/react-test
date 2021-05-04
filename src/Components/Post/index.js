import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { NavLink } from 'react-router-dom'
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
    setComments(post.comments?.data || [])
  }, [loading])

  const next = parseInt(postId, 10) + 1
  const prev = parseInt(postId, 10) - 1

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
            {prev !== 0 && (
              <NavLink href={POST(prev)} to={POST(prev)}>
                Prev
              </NavLink>
            )}
            &nbsp;
            {/* of course this hard code, but i need to understand how to get totalCount here */}
            {next < 100 && (
              <NavLink href={POST(next)} to={POST(next)}>
                Next
              </NavLink>
            )}
            <PostContainer key={post.id}>
              <h3>{post.title}</h3>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody mt={2}>{post.body}</PostBody>
            </PostContainer>
            <div>
              {prev !== 0 && (
                <NavLink href={POST(prev)} to={POST(prev)}>
                  Prev
                </NavLink>
              )}
              &nbsp;
              {next < 100 && (
                <NavLink href={POST(next)} to={POST(next)}>
                  Next
                </NavLink>
              )}
            </div>
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
