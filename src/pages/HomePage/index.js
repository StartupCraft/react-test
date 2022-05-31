import React, { useCallback, useMemo } from 'react'

import { useQuery } from '@apollo/client'
import Counter from 'components/Counter'
import ExpensiveTree from 'components/ExpensiveTree'
import FastRendering from 'components/FastRendering'
import Form from 'components/Form'
import PostsList from 'components/PostsList'
import postsQuery from 'graphQL/Queries/posts.graphql'

import { Column, Container } from './styles'

const POSTS_LOAD_LIMIT = 5

function HomePage() {
  const { data, loading, fetchMore } = useQuery(postsQuery, {
    variables: {
      limit: POSTS_LOAD_LIMIT,
    },
  })
  const posts = useMemo(() => data?.posts.data || [], [data])
  const { totalCount } = useMemo(() => data?.posts.meta || 0, [data])
  const nextPage = useMemo(
    () => Math.ceil(posts.length / POSTS_LOAD_LIMIT + 1),
    [posts],
  )

  const onLoadMoreHandler = useCallback(() => {
    if (posts.length >= totalCount) return null

    fetchMore({
      variables: {
        page: nextPage,
      },
    })

    return null
  }, [posts, totalCount])

  return (
    <Container>
      <Column>
        <PostsList
          loading={loading}
          posts={posts}
          totalCount={totalCount}
          onLoadMore={onLoadMoreHandler}
        />
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
