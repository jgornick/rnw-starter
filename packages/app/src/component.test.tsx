import { HelloWorld } from '@jgornick/rnw-starter-hello-world'
import { shallow } from 'enzyme'
import React from 'react'

import { App } from './component'

describe('<App>', () => {
  const createWrapper = () => shallow<typeof App>(
    <App />
  )

  type WrapperType = ReturnType<typeof createWrapper>

  let wrapper: WrapperType

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('should render <HelloWorld>', () => {
    expect(wrapper.find(HelloWorld)).toExist()
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
