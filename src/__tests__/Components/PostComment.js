import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import PostComments from '../../Components/PostDisplay/PostComments'

Enzyme.configure({adapter: new Adapter()});

describe("<PostComments />", () => {

  const data = [
    { id: 1, body: "test 1" },
    { id: 3, body: "test 3" },
    { id: 2, body: "test 2" },
    { id: 10, body: "test 10" },
    { id: 5, body: "test 5" },
  ]

  const emptyData = []

  it('Test Comments', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [data])

    const component = shallow(<PostComments data={data} />)
    component.find('sortableElement').forEach((item, index) =>{
      expect(item.prop("value")).toEqual(data[index].body)
    })
  })

  it('Test Empty Comments', () => {
   
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [emptyData])

    const component = shallow(<PostComments data={emptyData} />)
    //console.log(component.debug())
    expect(component.find('div').text()).toContain('Comments: No Comments')
  })
})