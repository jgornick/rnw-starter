import React, { FC } from 'react'

import { HelloWorldProps } from './component'

export const HelloWorld: FC<HelloWorldProps> = ({ onPress }) =>
  <button onClick={onPress}>Hello Web World!</button>
