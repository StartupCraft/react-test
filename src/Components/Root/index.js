import React, { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import Pagination from '../Pagination'

function Root() {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  const [value, setValue] = useState('')
  const [paginatedPage, setPaginatedPage] = useState(1)
  const { data, loading } = useQuery(postsQuery, {
    variables: {
      page: paginatedPage,
      limit: 10,
    },
  })

  const handlePush = useCallback(() => {
    setFields([...fields, { name: faker.name.findName(), id: nanoid() }])
  }, [fields])

  const handleCount = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const handleAlertClick = useCallback(() => {
    setTimeout(() => {
      alert(`You clicked ${count} times`)
    }, 2500)
  }, [count])

  const posts = data?.posts.data || []

  const totalCount = data?.posts.meta.totalCount || 0

  return (
    <Container>
      <Column>
        <h4>Added pagination</h4>
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
        <div>
          <Pagination
            paginatedPage={paginatedPage}
            setPaginatedPage={setPaginatedPage}
            total={totalCount}
          />
        </div>
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br />
          <input
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </label>
        <p>Not so slow anymore...</p>

        <h4>Closures</h4>
        <p>You clicked {count} times</p>
        <button type="button" onClick={handleCount}>
          Click me
        </button>
        <button type="button" onClick={handleAlertClick}>
          Show alert
        </button>
      </Column>

      <Column>
        <h4>
          Looks correct (not sure what was wrong, except for adding order)
        </h4>
        <button type="button" onClick={handlePush}>
          Add more
        </button>
        <ol>
          {fields?.map(field => (
            <li key={field.id}>{field.name}</li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
