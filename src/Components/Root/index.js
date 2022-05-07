import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, PaginationButton, Post, PostAuthor, PostBody } from './styles'

import ExpensiveTree from '../ExpensiveTree'

function Root () {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const limit = 5
  const { data, loading } = useQuery(postsQuery, { variables: { page, limit } })
  const countRef = useRef(0)
  const posts = data?.posts.data || []
  const totalPosts = data?.posts?.meta?.totalCount
  const totalPages = totalPosts / limit

  const handlePush = () => {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  const handleCount = () => {
    countRef.current = count + 1
    setCount(count + 1)
  }

  const handleAlertClick = () => {
    setTimeout(() => {
      alert(`You clicked ${countRef.current} times`)
    }, 2500)
  }

  const handlePreviousPage = () => {
    setPage(prevState => prevState - 1)
  }

  const handleNextPage = () => {
    setPage(prevState => prevState + 1)
  }

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
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </Post>
          ))}
        <div>
          <PaginationButton
            isDisabled={page === 1}
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            Previous page
          </PaginationButton>
          <PaginationButton
            isDisabled={page === totalPages}
            disabled={page === totalPages}
            onClick={handleNextPage}
          >
            Next page
          </PaginationButton>
        </div>
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br/>
          <input
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </label>
        <p>So slow...</p>
        <ExpensiveTree/>

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
        <h4>Incorrect form field behavior</h4>
        <button type="button" onClick={handlePush}>
          Add more
        </button>
        <ol>
          {fields.map(field => (
            <li key={field.id}>
              {field.name}:<br/>
              <input type="text"/>
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
