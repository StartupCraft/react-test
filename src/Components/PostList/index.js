import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import postsQuery from 'GraphQL/Queries/posts.graphql'
import { POST } from 'Router/routes'
import { Post, PostAuthor, PostBody } from './styles'
import Pagination from 'Components/Pagination'

function PostsList() {
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(5)
  const { data, loading } = useQuery(postsQuery, {
    variables: {
      page,
      limit: pageLimit,
    },
  })

  function onPageChanged(value) {
    setPage(value)
  }

  function onSizeChanged(value) {
    setPage(1)
    setPageLimit(value)
  }

  const posts = data?.posts?.data ?? []

  return (
    <>
      <h4>Need to add pagination</h4>
      {loading
        ? 'Loading...'
        : posts.map((post, index) => (
            <Post key={index} mx={4}>
              <NavLink
                href={POST(post.id)}
                to={{
                  pathname: POST(post.id),
                  state: {
                    posts: data?.posts?.data?.map(item => item.id) ?? [],
                  },
                }}
              >
                {post.title}
              </NavLink>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </Post>
          ))}
      <Pagination
        page={page}
        pageLimit={pageLimit}
        totalCount={data?.posts?.meta?.totalCount ?? 0}
        onPageChanged={onPageChanged}
        onSizeChanged={onSizeChanged}
      />
    </>
  )
}

export default PostsList
