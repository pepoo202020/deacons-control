import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ROLES_ACTIONS_CONTENT } from '@/constants/roles.data'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function RolesActions({lang = 'AR'} : {lang?: 'AR' | 'EN'}) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <BsThreeDotsVertical size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mx-2'>
            {
                ROLES_ACTIONS_CONTENT.map((role_action, index) => (
                    <DropdownMenuItem key={index}>{
                        role_action.title[lang]
                    }</DropdownMenuItem>
                ))
            }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
