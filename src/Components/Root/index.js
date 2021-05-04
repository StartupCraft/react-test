import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import {
  Column,
  Container,
  PagingButton,
  Post,
  PostAuthor,
  PostBody,
} from './styles'

import ExpensiveTree from '../ExpensiveTree'

function Root() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  const { data, loading } = useQuery(postsQuery, { variables: { page } })

  function handlePush() {
    const newFields = [...fields]
    newFields.push({ name: faker.name.findName(), id: nanoid() })
    setFields(newFields)
  }

  function handleAlertClick() {
    alert(`You clicked ${count} times`)
  }

  const posts = data?.posts.data || []

  useEffect(() => {
    setTotalCount((data?.posts?.meta?.totalCount || 0) / 10)
  }, [loading])

  const getPagination = () =>
    totalCount > 0 &&
    [...Array(totalCount).keys()].map(pageItem => (
      <PagingButton
        disabled={pageItem === page}
        key={pageItem}
        type="button"
        onClick={() => setPage(pageItem)}
      >
        {pageItem}
      </PagingButton>
    ))

  return (
    <Container>
      <Column>
        <div>{getPagination()}</div>
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
        <div>{getPagination()}</div>
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br />
          <input type="text" />
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
