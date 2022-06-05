import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ExpensiveTree from '../ExpensiveTree'

function createUserField() {
  return {
    name: faker.name.findName(),
    id: nanoid(),
  }
}

function Root() {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)
  countRef.current = count
  const [fields, setFields] = useState([createUserField()])

  const [value, setValue] = useState('')
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(postsQuery, {
    variables: { limit, page },
  })

  function handlePush() {
    setFields([createUserField(), ...fields])
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${countRef.current} times`)
    }, 2500)
  }

  const posts = data?.posts.data || []
  const totalPages = data ? data.posts.meta.totalCount / limit : 1

  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : posts.map(post => (
              <Post key={post.id} mx={4}>
                <NavLink href={POST(post.id)} to={POST(post.id)}>
                  {post.title}
                </NavLink>
                <p>{post.id}</p>
                <PostAuthor>by {post.user.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </Post>
            ))}
        <div>
          <div>
            <label htmlFor="posts-select">Posts per page:</label>
            <select
              id="posts-select"
              value={limit}
              onChange={event => setLimit(parseInt(event.target.value, 10))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div>
            <p>
              Page {page} of {totalPages}
            </p>
            <button
              disabled={page === 1}
              type="button"
              onClick={() => setPage(page - 1)}
            >
              Prev page
            </button>
            <button
              disabled={totalPages === page}
              type="button"
              onClick={() => setPage(page + 1)}
            >
              Next page
            </button>
          </div>
        </div>
      </Column>
      <Column>
        <h4>Fast rendering</h4>
        <label>
          Enter something here:
          <br />
          <input
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </label>
        <p>So fast...</p>
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
        <h4>Correct form field behavior</h4>
        <button type="button" onClick={handlePush}>
          Add more
        </button>
        <ol>
          {fields.map(({ name, id }) => (
            <li key={id}>
              {name}:<br />
              <input type="text" />
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
