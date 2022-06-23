import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ExpensiveTree from '../ExpensiveTree'

// Because data is missing from Post regarding what the next/prev id is from the server, I opted to pass the posts data to the post via it's state. I can then lookup the next/prev id from the returned list.
// This was the only solution I could think of that wouldn't cause a bad experience by clicking next and finding no post found (due to post being deleted or db id skipping)
// Used state to fix closure issue with show alert, alternate solution would be useRef but I thought this was cleaner and offered better user feedback
function Root() {
  const [count, setCount] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [alertEnabled, setAlertEnabled] = useState(true)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  const [value, setValue] = useState('')
  const { data, loading } = useQuery(postsQuery)

  function handlePush() {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  useEffect(() => {
    if (showAlert)
    {
      setShowAlert(false)
      alert(`You clicked ${count} times`)
      setAlertEnabled(true)
    }
  })

  function handleAlertClick() {
    setAlertEnabled(false)
    setTimeout(() => {
      setShowAlert(true)
    }, 2500)
  }

  const posts = data?.posts?.data ?? []

  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : posts.map((post, index) => (
              <Post mx={4} key={index}>
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
        <div>Pagination here</div>
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
        <button disabled={!alertEnabled} type="button" onClick={handleAlertClick}>
          {alertEnabled ? 'Show alert...' : 'Processing...'}
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
