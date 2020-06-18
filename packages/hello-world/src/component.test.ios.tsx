import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'react-native'

import { HelloWorld } from './component'

describe('<HelloWorld>', () => {
  const mockHandlePress = jest.fn()

  const createWrapper = () => shallow<typeof HelloWorld>(
    <HelloWorld onPress={mockHandlePress} />
  )

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render "Hello iOS World!"', () => {
    const wrapper = createWrapper()
    expect(wrapper.find(Button)).toHaveProp('title', 'Hello iOS World!')
  })

  it('should match snapshot', () => {
    const wrapper = createWrapper()
    expect(wrapper).toMatchSnapshot()
  })
})
