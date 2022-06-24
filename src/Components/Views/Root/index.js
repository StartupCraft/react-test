import React from 'react'
import PostsList from '../../PostList'
import { Column, Container } from './styles'
import SlowRendering from '../../SlowRendering'
import Closures from 'Components/Closures'
import FieldBehavior from '../../FieldBehavior'

function Root() {
  return (
    <Container>
      <Column>
        <PostsList />
      </Column>
      <Column>
        <SlowRendering />
        <Closures />
      </Column>
      <Column>
        <FieldBehavior />
      </Column>
    </Container>
  )
}

export default Root
