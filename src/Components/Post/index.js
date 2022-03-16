import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import { useQuery } from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'

import {POST, ROOT} from 'Router/routes'

import {
  Back,
  Column,
  Container,
  PostAuthor,
  PostBody,
  PostComment,
  PostContainer,
  Button
} from './styles'
import {NavLink} from "react-router-dom";
import {Skeleton} from "../Root/styles";

const SortableContainerData = SortableContainer(({ children }) => (
  <div>{children}</div>
))

const SortableItem = SortableElement(({ value }) => (
  <PostComment mb={2}>{value}</PostComment>
))

function Post() {
  const [comments, setComments] = useState([]);
  const history = useHistory()
  const {
    params: { postId },
  } = useRouteMatch()
  const [currentId, setCurrentId] = useState(parseInt(postId,10));
  const onButtonClick = (id) => history.push(id)
  const handleClick = () => history.push(ROOT)
  console.log(currentId)

  const onNextClick = () => {
    setCurrentId(prevState => prevState + 1)
  }
  const onBackClick = () => {
    setCurrentId(prevState => prevState -1);
  }
  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments,oldIndex, newIndex))
  }

  const { data, loading } = useQuery(postQuery, { variables: { id: postId } })
  const post = data?.post || {}
  useEffect(() => {
    Object.keys(post).length > 0 && setComments(post.comments?.data || [])
  }, [post])
  useEffect(() => {
    onButtonClick(POST(currentId))
  },[currentId])
  return (
    <Container>
      <Column>
        <Back onClick={handleClick}>Back</Back>
      </Column>
      <>
        <Column>
          <h4>Added next/previous links</h4>
          { loading ? (
            <Skeleton height="180px" width='60%'/>
          ) : (
            <PostContainer key={post.id}>
              <h3>{post.title}</h3>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody mt={2}>{post.body}</PostBody>
            </PostContainer>
          )}
          <div style={{display: 'flex', width: '55%', justifyContent: 'space-between', padding:'5px'}}>
            <Button onClick={onBackClick} disabled={currentId === 1}>
                Prev
            </Button>
            <Button onClick={onNextClick} disabled={currentId === 100}>
              Next
            </Button>
          </div>
        </Column>

        <Column>
          <h4>Correct sorting</h4>
          Comments:
          {loading ? (
              <div>
                <Skeleton height="90px" width='100%'/>
                <Skeleton height="90px" width='100%'/>
                <Skeleton height="90px" width='100%'/>
                <Skeleton height="90px" width='100%'/>
              </div>
            ):
            <SortableContainerData onSortEnd={handleSortEnd}>
              {comments.map((comment, index) => (
                <SortableItem
                  index={index}
                  key={comment.id}
                  mb={3}
                  value={comment.body}
                />
              ))}
            </SortableContainerData>
          }
        </Column>
      </>
    </Container>
  )
}

export default Post
