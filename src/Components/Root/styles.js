import styled, { keyframes } from 'styled-components'
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

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;
export const Skeleton = styled.div`
  display: inline-block;
  height: ${props => props.height || "14px"};
  width: ${props => props.width || "80%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(
    90deg,
    #eee,
    #f5f5f5,
    #eee
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-bottom: 8px;
  margin-top: ${props => props.marginTop || "0"}
`;
