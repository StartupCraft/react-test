import styled from 'styled-components'
import { margin } from '@styled-system/space'

export const Post = styled.div.attrs({
  mx: 0,
  my: 3,
})`
  width: 300px;
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
export const FetchMoreButton = styled.button`
  box-sizing: border-box;
  text-align: center;
  margin: 0 0 100px;
  padding: 12px 24px;
  width: 334px;
  border-radius: 4px;
  background: deepskyblue;
  color: white;
  outline: 0;
  border: 0;
  cursor: pointer;

  &:hover {
    background: dodgerblue;
  }

  &:active {
    background: blue;
  }

  &:disabled {
    background: lightgray;
    cursor: not-allowed;
  }
`
