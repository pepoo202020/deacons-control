'use client'
import NewButton from '@/components/newButton'
import { NEW_ROLE_BUTTON } from '@/constants/roles.data'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import NewRoleModal from './new-role-modal'

export default function NewRoleButton({lang='AR'} : {lang?: "AR"  | "EN"}) {
    const [open, setOpen] = useState<boolean>(false)

    const handleClick = () => {
        setOpen(!open)
    }
  return (
    <>
        <NewButton
            Icon={IoMdAdd}
            handleClick={handleClick}
            lang={lang}
            text={NEW_ROLE_BUTTON[lang]}
        />
        <NewRoleModal open={open} onOpenChange={handleClick} />
    </>
  )
}
