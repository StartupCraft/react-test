import React, { useState, useRef, useEffect } from 'react'
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
  // state setups
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])
  const [value, setValue] = useState('')

  function handlePush () {
    setFields(prevState => [{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }


  // pagination with useQuery
  const [curPageNum, setCurPageNum] = useState(1)
  const { data, loading, fetchMore } = useQuery(postsQuery, {
    variables: { page: curPageNum, limit: ITEM_PER_PAGE }
  })

  const posts = data?.posts.data || []
  const totalPageNumber = Math.ceil(data?.posts.meta.totalCount / ITEM_PER_PAGE)

  const handlePreviousPage = () => {
    if (curPageNum > 1) {
      fetchMore({ page: curPageNum - 1, limit: ITEM_PER_PAGE })
      setCurPageNum(prev => curPageNum - 1)
    }
  }

  const handleNextPage = () => {
    if (curPageNum < totalPageNumber) {
      fetchMore({ page: curPageNum + 1, limit: ITEM_PER_PAGE })
      setCurPageNum(prev => curPageNum + 1)
    }
  }


  // classical hooks closure problem, solved by ref
  // useRef keeps track of the same reference. the value of the reference may change
  const countRef = useRef(0)
  countRef.current = count

  function handleAlertClick () {
    setTimeout(() => {
      alert(`You clicked ${countRef.current} times`)
    }, 1500)
  }


  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : posts.map((post, index) => (
            <Post key={index} mx={4}>
              <NavLink href={POST(post.id)} to={POST(post.id)}>
                {post.title}
              </NavLink>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </Post>
          ))}
        <div>Pagination here</div>
        <button type="button" onClick={handlePreviousPage}>Previous</button>
        <button type="button" onClick={handleNextPage}>Next</button>
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
