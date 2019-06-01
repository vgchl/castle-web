import { shallow } from 'enzyme'
import React from 'react'
import Castle from './Castle'

describe('Castle', () => {
  test('renders', () => {
    const render = shallow(<Castle />)
    expect(render).toBeTruthy()
  })
})
