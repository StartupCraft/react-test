import React from 'react'
import PropTypes from 'prop-types'

import { Button, CurPage, Wrapper } from './styles'

const Pagination = ({
  currentPage,
  handleNext,
  handlePrev,
  nextDisabled = true,
  prevDisabled = true,
}) => (
  <Wrapper>
    <Button disabled={prevDisabled} type="button" onClick={handlePrev}>
      Prev
    </Button>

    <CurPage>
      Current page: <span>{currentPage}</span>
    </CurPage>

    <Button disabled={nextDisabled} type="button" onClick={handleNext}>
      Next
    </Button>
  </Wrapper>
)

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  nextDisabled: PropTypes.bool,
  prevDisabled: PropTypes.bool,
}

Pagination.defaultProps = {
  nextDisabled: true,
  prevDisabled: true,
}

export default Pagination
