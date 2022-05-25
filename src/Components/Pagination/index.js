import React from 'react'
import PropTypes from 'prop-types'

import { Button, Container, Item, List } from './styles'

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i)
  }

  const perviousPageHandler = () => {
    if (currentPage > 1) paginate(currentPage - 1)
  }

  const nextPageHandler = () => {
    if (currentPage < pageNumbers.length) paginate(currentPage + 1)
  }

  return (
    <Container>
      <Button onClick={perviousPageHandler}>Previous</Button>
      <List>
        {pageNumbers.map(number => (
          <Item key={number}>
            <Button type="button" onClick={() => paginate(number)}>
              {number}
            </Button>
          </Item>
        ))}
      </List>
      <Button onClick={nextPageHandler}>Next</Button>
    </Container>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
}

export default Pagination
