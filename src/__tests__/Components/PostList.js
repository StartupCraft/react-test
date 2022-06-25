import React from 'react'
import renderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from 'Services/Apollo'
import postsQuery from '../../GraphQL/Queries/posts.graphql'
import gql from 'graphql-tag'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import PostList from '../../Components/PostList'

Enzyme.configure({ adapter: new Adapter() })

describe("<PostList />", () => {
  it('Test Post List', async () => {
    // Implement GraphQL mocking to allow unit testing
    expect(false).toEqual(true)
    
  })
})