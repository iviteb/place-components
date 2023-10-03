import React from 'react'
import { Icon } from 'vtex.store-icons'

import style from './IconClear.css'

interface IconProps {
  size?: number
}

const IconClear = ({ size }: IconProps) => {
  return (
    <Icon
      id="sti-close--filled"
      size={size}
      activeClassName={`${style.clearIcon}`}
    />
  )
}

export default IconClear
