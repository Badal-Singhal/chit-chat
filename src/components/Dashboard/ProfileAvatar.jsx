import React from 'react'
import { Avatar } from 'rsuite'
import { getNameInitials } from '../../misc/Helper'

export default function ProfileAvatar({name, ...props}) {


  return (
    <Avatar  circle {...props}>
    {getNameInitials(name)}
    </Avatar>
  )
}
