import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { POST } from 'Router/routes'

import { Container, NextButton, PaginationItem, PrevButton } from './styles'

import { Post, PostAuthor, PostBody } from '../Root/styles'

const Pagination = ({ data, loading, dataLimit }) => {
  const pages = Math.round(data.length / dataLimit)

  const [currentPage, setCurrentPage] = useState(1)

  const nextPageHandler = () => {
    setCurrentPage(page => page + 1)
  }

  const previousPageHandler = () => {
    setCurrentPage(page => page - 1)
  }

  const changePage = event => {
    const pageNumber = Number(event.target.textContent)
    setCurrentPage(pageNumber)
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return data.slice(startIndex, endIndex)
  }

  const getPaginationGroup = () => {
    const pageLimit = Math.ceil(data.length / dataLimit)
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  return (
    <div>
      {/* show the posts, 10 posts at a time */}
      <div className="dataContainer">
        {loading
          ? 'Loading...'
          : getPaginatedData().map(post => (
              <Post key={post.id} mx={4}>
                <NavLink href={POST(post.id)} to={POST(post.id)}>
                  {post.title}
                </NavLink>
                <PostAuthor>by {post.user.name}</PostAuthor>
                <PostBody>{post.body}</PostBody>
              </Post>
            ))}
      </div>

      <Container>
        {/* previous button */}
        <PrevButton currentPage={currentPage} onClick={previousPageHandler}>
          Prev
        </PrevButton>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <PaginationItem
            currentPage={currentPage}
            item={item}
            key={index}
            onClick={changePage}
          >
            {item}
          </PaginationItem>
        ))}

        {/* next button */}
        <NextButton
          currentPage={currentPage}
          pages={pages}
          onClick={nextPageHandler}
        >
          Next
        </NextButton>
      </Container>
    </div>
  )
}

Pagination.propTypes = {
  data: PropTypes.array.isRequired,
  dataLimit: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default Pagination
