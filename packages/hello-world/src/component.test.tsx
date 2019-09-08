import { shallow } from 'enzyme'
import React from 'react'
import { Text } from 'react-native'

import { HelloWorld } from './component'

describe('<HelloWorld>', () => {
  const createWrapper = () => shallow<typeof HelloWorld>(
    <HelloWorld />
  )

  type WrapperType = ReturnType<typeof createWrapper>

  let wrapper: WrapperType

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should render "Hello Native World!"', () => {
    expect(wrapper.find(Text).children()).toHaveText('Hello Native World!')
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
