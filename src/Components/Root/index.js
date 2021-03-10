import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Pagination, NavButton, Post, PostAuthor, NavButtonWrapper, NavButtonPlaceholder, PostBody } from './styles'


//  import ExpensiveTree from '../ExpensiveTree'

function Root() {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  // for pagination
  let pages = []
  const [leftEnd, setLeftEnd] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [rightEnd, setRightEnd] = useState(6)

  const [value, setValue] = useState('')
  const { data, loading } = useQuery(postsQuery)

  function handlePush() {
    setFields([...fields, { name: faker.name.findName(), id: nanoid() }])
  }

  function handleAlertClick() {
    alert(`You clicked ${count} times`)
    // setTimeout(() => { }, 2500)
  }

  const posts = data?.posts.data || []

  const postPerPage = 1

  // function to divide posts array into pagination buttons depends on post per page
  function postsPages(postsArray) {

    const pagesNumber = Math.floor(postsArray.length / postPerPage) || 1

    const pagesArray = []

    for (let i = 0; i <= pagesNumber; i += 1) {
      pagesArray.push({ id: i + 1 })
    }
    pages = pagesArray

    return pagesArray.slice(leftEnd - 1, rightEnd - 1)
  }

  // function to make steps left and right, or shift of pagination buttons
  function paginationStep(event) {
    const stepType = event.target.attributes['data-step'].value

    if (stepType === "left" && currentPage > 1) {
      setCurrentPage(currentPage - 1)
      if (currentPage === leftEnd && leftEnd > 1) {
        setLeftEnd(leftEnd - 1)
        setRightEnd(rightEnd - 1)
      }

    } else if (stepType === "right" && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
      if (currentPage === rightEnd - 1 && rightEnd < pages.length) {
        setLeftEnd(leftEnd + 1)
        setRightEnd(rightEnd + 1)
      }
    }

  }

  // in case we need more than 1 post per page
  // should be used as =>    posts.slice(getPagePostsStart(),getPagePostsEnd()).map(...</>)
  //
  // function getPagePostsEnd() {
  //   console.log("currentPage", currentPage)
  //   return Math.floor((posts.length / postPerPage) * currentPage)
  // }
  // function getPagePostsStart() {
  //   return getPagePostsEnd() - postPerPage
  // }



  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : [posts[currentPage - 1]].map(post => (
            <Post mx={4} key={post.id}>
              <NavLink href={POST(post.id)} to={POST(post.id)}>
                {post.title}
              </NavLink>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
              <NavButtonWrapper>
                <NavButtonPlaceholder>
                  {currentPage !== 1 ? <button type="button" data-step="left" onClick={(event) => paginationStep(event)} >Prev</button> : null}
                </NavButtonPlaceholder>
                <NavButtonPlaceholder>
                  {currentPage !== posts.length ? <button type="button" data-step="right" onClick={(event) => paginationStep(event)}>Next</button> : null}
                </NavButtonPlaceholder>
              </NavButtonWrapper>
            </Post>
          ))}
        <Pagination>
          {
            postsPages(posts).map(page => <NavButton
              key={page.id} type="button"
              style={page.id === currentPage ? { color: "orange" } : { color: "black" }}
              onClick={() => setCurrentPage(page.id)}
            >{page.id}</NavButton>)
          }
        </Pagination>
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
        <p>So slow... </p>
        <p style={{ color: "orange" }}>HERE WAS ExpensiveTree which was giving 300ms delay</p>
        <h4>Closures</h4>
        <p style={{ color: "orange" }}> REMOVED   setTimeout 2500ms</p>
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
        <p style={{ color: "orange" }}>Adding new fields to the end of an array, instead of start</p>
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
