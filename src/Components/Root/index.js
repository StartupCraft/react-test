import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import faker from 'faker'
import { nanoid } from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import { POST } from 'Router/routes'

import { Column, Container, Post, PostAuthor, PostBody } from './styles'

import ExpensiveTree from '../ExpensiveTree'

import './index.css'

function Root() {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
      value: '',
    },
  ])

  const [value, setValue] = useState('')
  const { data, loading } = useQuery(postsQuery, {
    variables: { limit: 100 },
  })

  const [postData, setPostData] = useState([])
  function handlePush() {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  function handleAlertClick() {
    // alert ideally should not be delayed
    alert(`You clicked ${count} times`)
  }

  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 5

  useEffect(() => {
    if (!loading) {
      setPostData(data.posts.data)
      const items = data.posts.data
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(items.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(items.length / itemsPerPage))
    }
  }, [itemOffset, itemsPerPage, loading])

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % postData.length
    setItemOffset(newOffset)
  }

  const handleFieldChange = (e, id) => {
    const fieldsImprint = fields.slice()
    const indexToBeUpdated = fieldsImprint.findIndex(field => field.id === id)
    fieldsImprint[indexToBeUpdated] = {
      ...fieldsImprint[indexToBeUpdated],
      value: e.target.value,
    }
    setFields([...fieldsImprint])
  }

  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : currentItems &&
            currentItems.map(post => (
              <Post mx={4}>
                <NavLink href={POST(post.id)} to={POST(post.id)}>
                  {post.title}
                </NavLink>
                <PostAuthor>by {post.user.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </Post>
            ))}
        <div>Pagination here</div>
        <ReactPaginate
          activeClassName="active"
          breakClassName="page-item"
          breakLabel="..."
          breakLinkClassName="page-link"
          containerClassName="pagination"
          marginPagesDisplayed={2}
          nextClassName="page-item"
          nextLabel=">"
          nextLinkClassName="page-link"
          pageClassName="page-item"
          pageCount={pageCount}
          pageLinkClassName="page-link"
          pageRangeDisplayed={3}
          previousClassName="page-item"
          previousLabel="<"
          previousLinkClassName="page-link"
          renderOnZeroPageCount={null}
          onPageChange={handlePageClick}
        />
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
        {value}
        {/* <ExpensiveTree /> */}

        <h4>Closures</h4>
        <p>You clicked {count} times</p>
        <button type="button" onClick={() => setCount(prev => prev + 1)}>
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
          {fields.map(({ name, id: fieldId, value: fieldValue }, index) => (
            <li key={fieldId}>
              {name}:<br />
              <input
                type="text"
                value={fieldValue}
                onChange={e => handleFieldChange(e, fieldId)}
              />
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
