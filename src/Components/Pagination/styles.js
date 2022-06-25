import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PagingUI = styled.div`
  float: right;
`

export const PageSelect = styled(Link)`
  padding: 8px;
`

export const ActivePage = styled.span`
  font-weight: bolder;
  padding: 8px;
`