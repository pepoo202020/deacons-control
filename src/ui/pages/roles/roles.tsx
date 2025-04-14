import { RolesPerUsers } from "@/app/(dashboard)/dashboard/roles/page"
import { assignUsers } from "@/server/actions/roles/assign-users.action";
import { deleteRoles } from "@/server/actions/roles/delete-roles.action";
import { editRole } from "@/server/actions/roles/edit-role.action";
import RoleCard from "@/ui/pages/roles/role-card";

export default async function Roles({ roles }: {
  roles: RolesPerUsers[]
}) {
  return (
    <>
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          role={role}
          onShowProfile={async () => {
            'use server';
            // Handle show profile
          }}
          onAssignUsers={assignUsers}
          onEdit={editRole}
          onDelete={deleteRoles}
        />
      ))}
    </>
  )
}
