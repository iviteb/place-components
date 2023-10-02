import React from 'react'
import { Icon } from 'vtex.store-icons'

import style from './IconClear.css'

interface IconProps {
  size?: number
  className?: string
}

const IconClear = ({ size, className }: IconProps) => {
  return (
    <Icon
      id="sti-close--filled"
      size={size}
      activeClassName={`${style.clearIcon} ${className}`}
    />
  )
}

export default IconClear
