import { shallow } from 'enzyme'
import React from 'react'

import { HelloWorld } from './component'

describe('<HelloWorld>', () => {
  const mockHandlePress = jest.fn()

  const createWrapper = () => shallow<typeof HelloWorld>(
    <HelloWorld onPress={mockHandlePress} />
  )

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render "Hello Web World!"', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('button').children()).toHaveText('Hello Web World!')
  })

  it('should match snapshot', () => {
    const wrapper = createWrapper()
    expect(wrapper).toMatchSnapshot()
  })
})
