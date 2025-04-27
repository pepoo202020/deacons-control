import RolesBreadcrumb from '@/ui/dashboard/roles/breadcrumb-roles'
import React from 'react'

export default function RolesPage() {
  return (
    <div className='flex flex-col h-full'>
      {/* breadcrumb */}
      <div className='flex-none'>
        <div className="w-full px-4 py-4">
          <RolesBreadcrumb />
        </div>
      </div>
    </div>
  )
}
