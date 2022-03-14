import React, {useCallback, useState} from 'react'
import {NavLink} from 'react-router-dom'

import {useQuery} from '@apollo/client'
import faker from 'faker'
import {nanoid} from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import {POST} from 'Router/routes'

import {Column, Container, Post, PostAuthor, PostBody, Skeleton} from './styles'
import ExpensiveTree from '../ExpensiveTree'
import {Button} from "../Post/styles";
import {LINKS_PER_PAGE} from "../../constants";




function Root() {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName("", "", undefined),
      id: nanoid(),
    },
  ])

  const [value, setValue] = useState('');
  const [pages, setPages] = useState(1);
  const onNextClick = () => setPages(pages + 1);
  const onBackClick = () => setPages(pages - 1)

  const {data,  loading } =  useQuery(postsQuery,{variables:{page: pages, limit: LINKS_PER_PAGE}})
  const lastPage = Math.ceil(data?.posts.meta.totalCount / LINKS_PER_PAGE)
  function handlePush() {
    setFields([...fields, {
      name: faker.name.findName("", "", undefined),
      id: nanoid()}
    ])
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${count} times`)
    }, 500)
  }
  const handleCount = useCallback(() => {
    setCount(count + 1);
  },[count]);
  const posts = data?.posts.data || []
  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? <Skeleton height='100px' width='60%'/>
          : posts.map(post => (
            <Post mx={4} key={post.id}>
              <NavLink href={POST(post.id)} to={POST(post.id)}>
                {post.title}
              </NavLink>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </Post>
          ))}
        <div style={{display: 'flex', width: '55%', justifyContent: 'space-between', padding:'5px'}}>
          <Button disabled={pages===1} onClick={onBackClick}>Prev</Button>
          <Button onClick={onNextClick} disabled={pages === lastPage}>Next</Button>
        </div>
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br/>
          <form>
            <input
              value={value ?? ''}
              onChange={(event) => setValue(event.target.value)}
            />
          </form>
        </label>
        <p>So normal...</p>
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
        <h4>Correct form field behavior</h4>
        <button type="button" onClick={handlePush}>
          Add more
        </button>
        <ol>
          {fields.map((field, index) => (
            <li key={index}>
              {field.name}:<br/>
              <input type="text" />
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
