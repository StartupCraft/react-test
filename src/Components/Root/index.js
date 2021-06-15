import React from 'react'

import { Column, Container } from './styles'

import IncorrectForm from '../IncorrectForm'
import Posts from '../Posts'
import SlowRender from '../SlowRender'

const Root = () => (
  <Container>
    <Column>
      <Posts />
    </Column>

    <Column>
      <SlowRender />
    </Column>

    <Column>
      <IncorrectForm />
    </Column>
  </Container>
)

export default Root
