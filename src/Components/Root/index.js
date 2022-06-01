import React, { useState } from 'react'

import { useQuery } from '@apollo/client'

import Closures from 'Components/Closures'
import ExpensiveTree from 'Components/ExpensiveTree'
import Form from 'Components/Form'
import Pagination from 'Components/Pagination'
import SlowRendering from 'Components/SlowRendering'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { Column, Container } from './styles'

function Root() {
  const [value, setValue] = useState('')
  const { data, loading } = useQuery(postsQuery)

  const posts = data?.posts.data || []

  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {/* Pagination */}
        <Pagination data={posts} dataLimit={4} loading={loading} />
      </Column>
      <Column>
        <SlowRendering setValue={setValue} value={value} />
        {/* ExpensiveTree */}
        <ExpensiveTree />
        {/* Closure */}
        <Closures />
      </Column>
      {/* Form */}
      <Form />
    </Container>
  )
}

export default Root
