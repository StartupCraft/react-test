import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'
import ExpensiveTree from "Components/ExpensiveTree"

const ITEM_PER_PAGE = 3

function Root () {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])
  const [value, setValue] = useState('')
  const { data, loading } = useQuery(postsQuery)

  // pagination
  const [curPageNum, setCurPageNum] = useState(0)

  function handlePush () {
    setFields(prevState => [{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  function handleAlertClick () {
    setTimeout(() => {
      alert(`You clicked ${count} times`)
    }, 1500)
  }

  function handlePage (index) {
    setCurPageNum(index)
  }

  const posts = data?.posts.data || []

  // paginator parameters
  const totalPageNumber = Math.ceil(posts.length / ITEM_PER_PAGE)
  const start = curPageNum * ITEM_PER_PAGE
  const end = (curPageNum + 1) * ITEM_PER_PAGE

  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : posts.slice(start, end).map((post, index) => (
            <Post key={index} mx={4} NumOfPosts={posts.length}>
              <NavLink href={POST(post.id)} to={POST(post.id)}>
                {post.title}
              </NavLink>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </Post>
          ))}
        <div>Pagination here</div>
        {(new Array(totalPageNumber).fill(-1)).map((post, index) => (
          <button
            key={index}
            type="submit"
            onClick={() => handlePage(index)}
          >{index}</button>
        ))}
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
