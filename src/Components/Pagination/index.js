import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { Container, Page } from './styles'

const Pagination = ({ paginatedPage, setPaginatedPage, total }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(total / 10); i += 1) {
    pageNumbers.push(i)
  }

  const handlePaginateNext = useCallback(() => {
    setPaginatedPage(paginatedPage + 1)
  }, [paginatedPage])

  const handlePaginatePrev = useCallback(() => {
    setPaginatedPage(paginatedPage - 1)
  }, [paginatedPage])

  const handlePaginate = useCallback(
    (e, page) => {
      e.preventDefault()
      setPaginatedPage(page)
    },
    [paginatedPage],
  )

  return (
    <Container mt={25}>
      <button
        disabled={paginatedPage === 1}
        type="button"
        onClick={handlePaginatePrev}
      >
        Prev Page
      </button>
      {pageNumbers?.map(page => (
        <Page
          key={page}
          ml={1}
          mr={1}
          role="none"
          onClick={e => handlePaginate(e, page)}
          onKeyDown={() => {}}
        >
          {page}
        </Page>
      ))}
      <button
        disabled={paginatedPage === pageNumbers.length}
        type="button"
        onClick={handlePaginateNext}
      >
        Next Page
      </button>
    </Container>
  )
}

Pagination.propTypes = {
  paginatedPage: PropTypes.number.isRequired,
  setPaginatedPage: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
}

export default Pagination
