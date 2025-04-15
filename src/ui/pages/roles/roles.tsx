'use client'

import { RolesPerUsers } from "@/app/(dashboard)/dashboard/roles/page"
import { assignUsers } from "@/server/actions/roles/assign-users.action";
import { deleteRoles } from "@/server/actions/roles/delete-roles.action";
import { editRole } from "@/server/actions/roles/edit-role.action";
import AssignUsersModal from "@/ui/pages/roles/assign-users-modal";
import RoleCard from "@/ui/pages/roles/role-card";
import { User } from "@prisma/client";
import { useState } from "react";

interface RolesProps {
  roles: RolesPerUsers[];
  availableUsers: User[];
}

export default function Roles({ roles, availableUsers }: RolesProps) {
  const [selectedRole, setSelectedRole] = useState<RolesPerUsers | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAssignUsers = async (roleId: string, selectedUsers: string[]) => {
    // TODO: Implement assign users
  };

  return (
    <>
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          role={role}
          onShowProfile={() => { }}
          onAssignUsers={() => {
            setSelectedRole(role);
            setIsModalOpen(true);
          }}
          onEdit={() => { }}
          onDelete={() => { }}
        />
      ))}
      {selectedRole && (
        <AssignUsersModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRole(null);
          }}
          onAssign={(selectedUsers) => handleAssignUsers(selectedRole.id, selectedUsers)}
          availableUsers={availableUsers}
          currentAssignedUsers={selectedRole.UserRole.map(ur => ur.userId)}
          roleName={selectedRole.name}
        />
      )}
    </>
  )
}