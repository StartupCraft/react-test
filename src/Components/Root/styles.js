import styled from 'styled-components'
import { margin } from '@styled-system/space'

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  justify-content: space-between;
`

export const Column = styled.div`
  width: 30%;
  min-height: 100vh;
  padding: 16px;
`

export const Post = styled.div.attrs({
  mx: 0,
  my: 3,
})`
  width: 300px;
  height:100px;
  border: 1px solid lightgray;
  border-radius: 8px;
  background: lightgray;
  padding: 16px;
  display:flex;
  flex-direction: column;
  justify-content:space-between;
  alignItems: center;

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

export const Pagination = styled.p`
  height: 50px;
  width: 350px;
  display:flex;
  justify-content:space-between;
  alignItems: center;
`
export const NavButtonWrapper = styled.div`
  height: 30px;
  width: 100%;
  display:flex;
  justify-content:space-between;
  alignItems: center;
`

export const NavButton = styled.button`
  background: lightGrey;
  height: 100%;
  width: 100%;
  color: white;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
`
export const NavButtonPlaceholder = styled.button`
  height: 100%;
  width: 50%;
  border:none;
  outline:none;
  background: none;
`
