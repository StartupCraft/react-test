import styled from 'styled-components'
import { margin } from '@styled-system/space'

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  justify-content: space-between;

  @media (max-width: 767px) {
    display: block;
    flex: 0;
    flex: 0;
    width: auto;
  }
`

export const Column = styled.div`
  width: 30%;
  padding: 16px;

  @media (max-width: 767px) {
    width: auto;
    min-width: 350px;
  }
`

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
