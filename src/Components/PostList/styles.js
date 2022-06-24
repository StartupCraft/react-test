import styled from 'styled-components'
import { margin } from '@styled-system/space'

export const Post = styled.div.attrs({
  mx: 0,
  my: 3,
})`
  width: auto;
  border: 1px solid lightgray;
  border-radius: 8px;
  background: lightgray;
  padding: 16px;

  ${margin}
`

export const PostAuthor = styled.small`
  display: block;
  color: gray;
`

export const PostBody = styled.div`
  height: 19px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`
