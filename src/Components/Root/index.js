import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ExpensiveTree from '../ExpensiveTree'

function Root() {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const { data, loading, fetchMore } = useQuery(postsQuery, {
    variables: {
      limit: 3,
      page: 1,
    },
  })

  function handlePush() {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${count} times`)
    }, 2500)
  }

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

        <button
          disabled={page === 1}
          type="button"
          onClick={() =>
            fetchMore({
              variables: {
                page: page - 1,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                setPage(page - 1)
                if (!fetchMoreResult) return prev
                return {
                  posts: {
                    ...prev.posts,
                    data: [...fetchMoreResult.posts.data],
                  },
                }
              },
            })
          }
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() =>
            fetchMore({
              variables: {
                page: page + 1,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                setPage(page + 1)
                if (!fetchMoreResult) return prev
                return {
                  posts: {
                    ...prev.posts,
                    data: [...fetchMoreResult.posts.data],
                  },
                }
              },
            })
          }
        >
          NEXT
        </button>
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
        <p>So slow...</p>
        <ExpensiveTree />

        <h4>Closures</h4>
        <p>You clicked {count} times</p>
        <button type="button" onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button type="button" onClick={handleAlertClick}>
          Show alert
        </button>
      </Column>

      <Column>
        <h4>Incorrect form field behavior</h4>
        <button type="button" onClick={handlePush}>
          Add more
        </button>
        <ol>
          {fields.map((field, index) => (
            <li key={index}>
              {field.name}:<br />
              <input type="text" />
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
