import React from 'react'
import PropTypes from 'prop-types'

function Pagination({
  page,
  pageLimit,
  totalCount,
  onPageChanged,
  onSizeChanged
}) {
  
  function calculateRange() {
    const result = []
    for (let i = Math.max(page - 5, 1); i <= Math.min(page + 5, maxPages); i += 1) {
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
      <div hidden={maxPages === 1}>
        <button
          disabled={page <= 1}
          type="button"
          onClick={() => onPageSelected(page - 1)}
        >
          Previous
        </button>
          {paginationRange.map(x => (
            <button disabled={x === page} key={x} type="button" onClick={() => onPageSelected(x)}>
              {x}
            </button>
          ))}
        <button
          disabled={page >= maxPages}
          type="button"
          onClick={() => onPageSelected(page + 1)}
        >
          Next
        </button>
      </div>
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
