'use client'
import NewButton from '@/components/newButton'
import { NEW_ROLE_BUTTON } from '@/constants/roles.data'
import React from 'react'
import { IoMdAdd } from 'react-icons/io'

export default function NewRoleButton({lang='AR'} : {lang?: "AR"  | "EN"}) {
  return (
    <NewButton
        Icon={IoMdAdd}
        handleClick={() => {}}
        lang={lang}
        text={NEW_ROLE_BUTTON[lang]}
    />
  )
}
