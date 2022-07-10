import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useQuery, useLazyQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [pageNo, setPageNo] = useState(1)
  const [limit, setLimit] = useState(10)
  const [value, setValue] = useState('')
  const [getPosts, { data, loading, fetchMore }] = useLazyQuery(postsQuery, { page: pageNo, limit: 100 })
  const [postData, setPostData] = useState([])

  useEffect(() => {

    if (!loading && data) {
      const postFromApi = {};

      [...postData, ...data?.posts.data].forEach(item => {
        postFromApi[item.id] = item
      })
      setPostData(Object.values(postFromApi))
    }
  }, [loading, data])
  function handlePush() {
    setFields([...fields, { name: faker.name.findName(), id: nanoid() },])
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${count} times`)
    }, 2500)
  }
  useEffect(() => {
    getPosts({
      variables: {
        page: pageNo,
        limit: 10
      }
    })
  }, [pageNo])
  const posts = data?.posts.data || []

  const getMorePosts = () => {
    if (!loading && postData.length) {
      setPageNo(pageNo + 1)
    }
  }
  // console.log("🚀 ~ file: index.js ~ line 58 ~ getMorePosts ~ loading", loading);
  console.log("🚀 ~ file: index.js ~ line 58 ~ getMorePosts ~ postData.length", postData.length);
  // console.log("🚀 ~ file: index.js ~ line 69 ~ Root ~ postData.length+limit!==data?.posts.totalCount", postData.length+limit!==data?.posts.totalCount);
  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        <InfiniteScroll
          dataLength={postData.length}
          next={getMorePosts}
          hasMore={postData.length !== data?.posts?.meta.totalCount}
          loader={<h4>Loading...</h4>}
        >
          {postData.map(post => (
            <Post mx={4}>
              <NavLink href={POST(post.id)} to={POST(post.id)}>
                {post.title}
              </NavLink>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </Post>
          ))}
        </InfiniteScroll>
        <div>Pagination here</div>
      
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
    </Container >
  )
}

export default Root
