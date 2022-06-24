import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import PostDisplay from '../../Components/PostDisplay'

Enzyme.configure({adapter: new Adapter()});

describe("<PostDisplay />", () => {

  const postId = '123'
  const posts = [122, 124]

  const data = { 
    post: {
      id: 1,
      body: "Test Body",
      title: "Test Title",
      user: { name: "Test User" },
      comments: {
        data: [
          { id: 1, body: "test 1" },
          { id: 3, body: "test 3" },
        ]
      }
    }
  }

  const noData = {}


  it('Test Post Display', () => {
    const component = shallow(<PostDisplay data={data} postId={postId} posts={posts} />)
    expect(component.find('#title').text()).toEqual(data.post.title)
    expect(component.find('#author').text()).toEqual('by ' + data.post.user.name)
    expect(component.find('#body').text()).toEqual(data.post.body)
  })
})