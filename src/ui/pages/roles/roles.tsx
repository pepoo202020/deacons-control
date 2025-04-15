'use client'

import { RolesPerUsers } from "@/app/(dashboard)/dashboard/roles/page"
import { assignUsers } from "@/server/actions/roles/assign-users.action";
import { deleteRoles } from "@/server/actions/roles/delete-roles.action";
import { editRole } from "@/server/actions/roles/edit-role.action";
import AssignUsersModal from "@/ui/pages/roles/assign-users-modal";
import DeleteRoleAlert from "@/ui/pages/roles/delete-role-modal";
import EditRoleModal from "@/ui/pages/roles/edit-role-modal";
import RoleCard from "@/ui/pages/roles/role-card";
import RoleProfileModal from "@/ui/pages/roles/role-profile-modal";
import { User } from "@prisma/client";
import { useState } from "react";

interface RolesProps {
  roles: RolesPerUsers[];
  availableUsers: User[];
}

export default function Roles({ roles, availableUsers }: RolesProps) {
  const [selectedRole, setSelectedRole] = useState<RolesPerUsers | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoleProfileModalOpen, setIsRoleProfileModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const handleAssignUsers = async (roleId: string, selectedUsers: string[]) => {
    // TODO: Implement assign users
  };

  const handleEditRole = async (roleId: string, name: string, description: string) => {
    // TODO: Implement edit role
  };

  const handleDeleteRole = async (roleId: string) => {
    // TODO: Implement delete role
  };

  return (
    <>
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          role={role}
          onShowProfile={() => {
            setSelectedRole(role);
            setIsRoleProfileModalOpen(true);
          }}
          onAssignUsers={() => {
            setSelectedRole(role);
            setIsModalOpen(true);
          }}
          onEdit={() => {
            setSelectedRole(role);
            setIsEditModalOpen(true);
          }}
          onDelete={() => {
            setSelectedRole(role);
            setIsDeleteModalOpen(true);
          }}
        />
      ))}
      {selectedRole && (
        <RoleProfileModal
          isOpen={isRoleProfileModalOpen}
          onClose={() => {
            setIsRoleProfileModalOpen(false);
            setSelectedRole(null);
          }}
          role={selectedRole}
        />
      )}
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
      {selectedRole && (
        <EditRoleModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          role={selectedRole}
          onEdit={(roleId, name, description) => handleEditRole(roleId, name, description)}
        />
      )}
      {selectedRole && (
        <DeleteRoleAlert
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          role={selectedRole}
          onDelete={(roleId) => handleDeleteRole(roleId)}
        />
      )}
    </>
  )
}