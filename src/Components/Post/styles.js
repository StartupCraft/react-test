import styled from 'styled-components'
import { margin } from '@styled-system/space'

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: auto;
  justify-content: space-between;

  @media (max-width: 767px) {
    display: block;
    flex: 0;
    flex: 0;
    width: auto;
  }
`

export const Column = styled.div`
  width: 50%;
  padding: 16px;
  @media (max-width: 767px) {
    width: auto;
    min-width: 350px;
  }
`

export const Centered = styled.div`
  width: 100%;
  text-align: center;
`

export const PrevButton = styled.button`
  float: left;
  margin-top: 16px;
`
export const NextButton = styled.button`
  float: right;
  margin-top: 16px;
`

export const PostContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  background: lightgray;
  padding: 16px;

  h3 {
    margin: 0;
  }

  ${margin}
`

export const PostAuthor = styled.small`
  display: block;
  color: gray;
`

export const PostBody = styled.div`
  ${margin}
`

export const PostComment = styled.div`
  background: #eeeeee;
  border-radius: 8px;
  padding: 16px;

  ${margin}
`

export const Back = styled.div`
  color: blue;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`
