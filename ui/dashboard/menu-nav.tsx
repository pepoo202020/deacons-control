'use client'
import { MENU_NAV_DATA } from '@/constants/dashboard.data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function MenuNav() {
  const lang = 'AR'
  const pathname = usePathname()
  return (
    <div
      className='w-full px-10 flex items-center justify-center bg-neutral-300 dark:bg-blue-950 text-blue-950 dark:text-white space-x-1 overflow-y-auto'
    >
      {
        MENU_NAV_DATA.map((menu_item, index) => (
          <Link href={menu_item.link} key={index} className={
            cn(
              pathname === menu_item.link && "bg-blue-950 text-white dark:bg-white dark:text-blue-950 cursor-auto" ,
              "h-full w-fit px-1 py-3",
              "hover:bg-blue-950 hover:text-white hover:dark:bg-white hover:dark:text-blue-950",
              "transition-all duration-200"
            )
          }>
            <span className='flex flex-col items-center justify-center'>
              <menu_item.icon size={20} />
            </span>
            <span>{menu_item.title[lang]}</span>
          </Link>
        ))
      }
    </div>
  )
}
