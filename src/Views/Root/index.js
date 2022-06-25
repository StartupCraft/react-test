import React from 'react'
import PostsList from '../../Components/PostList'
import SlowRendering from '../../Components/SlowRendering'
import Closures from '../../Components/Closures'
import FieldBehavior from '../../Components/FieldBehavior'
import { Column, Container } from './styles'

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
