import NewButton from '@/components/newButton'
import RolesBreadcrumb from '@/ui/dashboard/roles/breadcrumb-roles'
import NewRoleButton from '@/ui/dashboard/roles/new-role-btn'
import React from 'react'

export default function RolesPage() {
  return (
    <div className='flex flex-col h-full relative'>
      {/* breadcrumb */}
      <div className='flex-none'>
        <div className="w-full px-4 py-4">
          <RolesBreadcrumb />
        </div>
      </div>
      {/* Roles Cards */}
      {/* Pagination */}
      {/* new button action */}
      <NewRoleButton />
    </div>
  )
}
