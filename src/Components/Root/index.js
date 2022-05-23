import React, { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import {
  Column,
  Container,
  PageButton,
  Post,
  PostAuthor,
  PostBody,
  Row,
} from './styles'

import ExpensiveTree from '../ExpensiveTree'

const LIMIT = 10

function Root() {
  const [activePage, setActivePage] = useState(1)
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  const countRef = useRef()

  const [value, setValue] = useState('')
  const { data, loading } = useQuery(postsQuery, {
    variables: {
      page: activePage,
      limit: LIMIT,
    },
  })

  const pages = useMemo(() => {
    const totalCount = data?.posts.meta.totalCount
    if (!totalCount) {
      return []
    }
    return [...new Array(Math.ceil(data?.posts.meta.totalCount / LIMIT))].map(
      (item, index) => index + 1,
    )
  }, [data?.posts.meta.totalCount])

  function handlePush() {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  console.log(pages)

  useEffect(() => {
    countRef.current = count
  }, [count])

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${countRef.current} times`)
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
              <Post key={post.id} mx={4}>
                <NavLink href={POST(post.id)} to={POST(post.id)}>
                  {post.title}
                </NavLink>
                <PostAuthor>by {post.user.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </Post>
            ))}
        <Row>
          {pages.map(page => (
            <PageButton
              isActive={page === activePage}
              type="button"
              onClick={() => setActivePage(page)}
            >
              {page}
            </PageButton>
          ))}
        </Row>
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
          {fields.map(field => (
            <li key={field.id}>
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
