import React from 'react'

import { useQuery } from '@apollo/client'
import Counter from 'components/Counter'
import ExpensiveTree from 'components/ExpensiveTree'
import FastRendering from 'components/FastRendering'
import Form from 'components/Form'
import PostsList from 'components/PostsList'
import postsQuery from 'graphQL/Queries/posts.graphql'

import { Column, Container } from './styles'

function HomePage() {
  const { data, loading } = useQuery(postsQuery, {
    variables: {
      limit: 5,
    },
  })
  const posts = data?.posts.data || []
  const { totalCount } = data?.posts.meta || 0

  return (
    <Container>
      <Column>
        <PostsList loading={loading} posts={posts} totalCount={totalCount} />
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

export default HomePage
