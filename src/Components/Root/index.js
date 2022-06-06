import React, { useState ,useEffect} from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ExpensiveTree from '../ExpensiveTree'

const limit  =5;

function Root() {
  const [count, setCount] = useState(0)

  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])
  const [page, setPage] = useState(1)

  const [value, setValue] = useState('')
  const { loading, data, fetchMore } = useQuery(postsQuery,  {
    variables: {
      limit ,
      offset :0
    }
  })



  function handlePush() {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${count} times`)
    }, 2500)
  }

  const handlePagination = (dir) => () => {
    const direction = {
      ['next']: (stateData) => stateData + 1,
      ['prev']: (stateData) => stateData - 1
    }
    setPage(prev => {
      fetchMore({
        limit,
        page:  direction[dir](prev)
      })
      return direction[dir](prev)
    })
  }


  const pages = data?.posts.meta.totalCount / limit || 0

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

        <button disabled={page === 1} type='button' onClick={handlePagination('prev')}>Prev</button>
        <button disabled={page === pages} type='button' onClick={handlePagination('next')}>Next</button>
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
