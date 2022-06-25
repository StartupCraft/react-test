import React from 'react'
import PropTypes from 'prop-types'

import { ActivePage, PageSelect, PagingUI } from './styles'

/*
  Usage: Pass the current {page}, the max results per page {pageLimit} and total results available {totalCount} to calculate and display a reusable pagination
  When the page changes onPageChanged(page) is called, telling the parent the new page number
  When the max results per page is changed onSizeChanged(size) is called, telling the parent how many results per page to load
  All of these fields are REQUIRED
*/
function Pagination({
  page,
  pageLimit,
  totalCount,
  onPageChanged,
  onSizeChanged,
}) { 
  function calculateRange() {
    const result = []
    const start = Math.max(page - 4, 1)
    const end = Math.min(page + 6, maxPages)
    for (let i = start; i <= end; i += 1) {
      result.push(i)
    }
    // Limit to 8
    return result.slice(0, 8)
  }
  function onPageSizeSelected(event) {
    onSizeChanged(parseInt(event.target.value, 10))
  }

  function onPageSelected(newPage) {
    onPageChanged(newPage)
  }

  const totalPostsCount = totalCount ?? 0
  const maxPages = Math.ceil(totalPostsCount / pageLimit)
  const paginationRange = calculateRange()

  return (
    <div>
      <div>
        <label>Max Results </label>
        <select onChange={onPageSizeSelected}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <PagingUI hidden={maxPages === 1}>
        <button
          disabled={page <= 1}
          type="button"
          onClick={() => onPageSelected(page - 1)}
        >
          Previous
        </button>
        {paginationRange.map(x =>
          x === page ? 
            <ActivePage key={x}>{x}</ActivePage> :
            <PageSelect key={x} to='/' onClick={() => onPageSelected(x)}>
              {x}
          </PageSelect>
        )}
        <button
          disabled={page >= maxPages}
          type="button"
          onClick={() => onPageSelected(page + 1)}
        >
          Next
        </button>
      </PagingUI>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  onSizeChanged: PropTypes.func.isRequired,
}

export default Pagination
