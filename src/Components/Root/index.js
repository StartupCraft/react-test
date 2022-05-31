import React from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'

import Counter from 'Components/Counter'
import FastRendering from 'Components/FastRendering'
import Form from 'Components/Form'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ExpensiveTree from '../ExpensiveTree'

function Root() {
  const { data, loading } = useQuery(postsQuery)
  const posts = data?.posts.data || []

  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : posts.map(post => (
              <Post mx={4}>
                <NavLink href={POST(post.id)} to={POST(post.id)}>
                  {post.title}
                </NavLink>
                <PostAuthor>by {post.user.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </Post>
            ))}
        <div>Pagination here</div>
      </Column>
      <Column>
        <FastRendering />
        <p>
          So <s>slow</s>💨...
        </p>
        <ExpensiveTree />

        <Counter />
      </Column>

      <Column>
        <Form />
      </Column>
    </Container>
  )
}

export default Root
