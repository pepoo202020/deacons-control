import Brand from '@/components/brand'
import { ModeToggle } from '@/components/theme-toggler'
import { HEADER_DATA } from '@/constants/dashboard.data'
import { translateRole } from '@/utils/trnslate-role'
import React from 'react'

export default function DashboardHeader() {
    const role = 'admin'
    const lang = 'AR'
  return (
    <div
        className='px-10 py-2 bg-neutral-300 dark:bg-blue-950 flex items-center justify-between text-blue-950 dark:text-white'
    >
        {/* brand */}
        <Brand size='SM' />
        {/* main role title */}
        <h2 className='font-semibold text-xl hidden md:block'>
            {HEADER_DATA.mainTitle[lang]}
            <span>{translateRole(role, lang)}</span>
        </h2>
        {/* roles select */}
        {/* user profile */}
        {/* theme changer */}
        <ModeToggle />
    </div>
  )
}
