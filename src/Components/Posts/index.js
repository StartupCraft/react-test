import React, { useCallback, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Post, PostAuthor, PostBody } from './styles'

import Pagination from '../Pagination'

const Posts = () => {
  const paginationLimit = 10

  const [paginationPage, setPaginationPage] = useState(1)

  const { data, loading } = useQuery(postsQuery, {
    variables: {
      page: paginationPage,
      limit: paginationLimit,
    },
  })

  const prevDisabled = useMemo(() => paginationPage === 1, [paginationPage])

  const nextDisabled = useMemo(
    () => paginationPage * paginationLimit >= data?.posts.meta.totalCount,
    [paginationPage, paginationLimit, data?.posts.meta.totalCount],
  )
  const handlePaginationNext = useCallback(() => {
    if (!nextDisabled) {
      setPaginationPage(paginationPage + 1)
    }
  }, [paginationPage, setPaginationPage, nextDisabled])

  const handlePaginationPrev = useCallback(() => {
    if (!prevDisabled) {
      setPaginationPage(paginationPage - 1)
    }
  }, [paginationPage, setPaginationPage, prevDisabled])

  const paginationProps = {
    currentPage: paginationPage,
    handleNext: handlePaginationNext,
    handlePrev: handlePaginationPrev,
    nextDisabled,
    prevDisabled,
  }

  const posts = data?.posts.data || []

  return (
    <>
      <Pagination {...paginationProps} />
      {loading
        ? 'Loading...'
        : posts.map(post => (
            <Post key={post.id} mx={4}>
              <NavLink href={POST(post.id)} to={POST(post.id)}>
                {post.title}
              </NavLink>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </Post>
          ))}
      <Pagination {...paginationProps} />
    </>
  )
}

export default Posts
